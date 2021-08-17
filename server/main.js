const PAYMENT_CREDENTIALS = {
  RAZORPAY_KEY_ID: "rzp_test_NybzyAbZNToaGG",
  RAZORPAY_SECRET: "7PMuXJzTwFSd0iX3A3Uo82Bo",
};

const Razorpay = require("razorpay");
const crypto = require("crypto");

Parse.Cloud.define("getCategoriesApi", async (request) => {
  const queryCategories = new Parse.Query("CampaignCategory");
  const resultsCategories = await queryCategories.find();
  return resultsCategories;
});

Parse.Cloud.define("getCampaignInfo", async (request) => {
  const queryCampaignInfo = new Parse.Query("CampaignInfo");
  queryCampaignInfo.include("categoryRef");
  queryCampaignInfo.include("userRef");
  const resultCampaignInfo = await queryCampaignInfo.find();
  return resultCampaignInfo;
});

Parse.Cloud.define("CampaignInfoById", async (request) => {
  const { campaignId } = request.params;
  const queryCampaignInfo = new Parse.Query("CampaignInfo");
  queryCampaignInfo.equalTo("objectId", campaignId);
  queryCampaignInfo.include("categoryRef");
  queryCampaignInfo.include("userRef");
  const resultCampaignInfo = await queryCampaignInfo.find();
  return resultCampaignInfo;
});

Parse.Cloud.define("getCampaignInfoByUserId", async (request) => {
  const userId = request.params.userId;
  const queryCampaignInfo = new Parse.Query("CampaignInfo");
  var Pointer = {
    __type: "Pointer",
    className: "_User",
    objectId: userId,
  };
  queryCampaignInfo.equalTo("userRef", Pointer);
  queryCampaignInfo.include("categoryRef");
  queryCampaignInfo.include("userRef");
  const resultCampaignInfo = await queryCampaignInfo.find();
  return resultCampaignInfo;
});

function getCategoryPointer(category) {
  return {
    __type: "Pointer",
    className: "CampaignCategory",
    objectId: category,
  };
}

Parse.Cloud.define("searchCampaignInfo", async (request) => {
  const { searchKey, categories } = request.params;

  const campaignQuery = new Parse.Query("CampaignInfo");
  if (searchKey) {
    campaignQuery.fullText("name", searchKey);
  }
  if (categories && categories.length) {
    categoriesQuery = [];
    categories.forEach((categoryId) => {
      categoriesQuery.push(getCategoryPointer(categoryId));
    });
    campaignQuery.containedIn("categoryRef", categoriesQuery);
  }
  campaignQuery.include("categoryRef");
  campaignQuery.include("userRef");
  const queryResult = await campaignQuery.find();
  return {
    queryResult,
    length: queryResult ? queryResult.length : 0,
  };
});

Parse.Cloud.define("orders", async (request) => {
  const { amount, campaignInfoId, donorUserId } = request.params;

  if (!amount || isNaN(amount) || !campaignInfoId || !donorUserId) {
    throw new Error("Invalid details.");
  }

  try {
    const instance = new Razorpay({
      key_id: PAYMENT_CREDENTIALS.RAZORPAY_KEY_ID,
      key_secret: PAYMENT_CREDENTIALS.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    if (!order) {
      throw new Error("Could not create the order.");
    }

    const fundRaiserInfo = new Parse.Object("FundRaiserInfo", {
      campaignInfoRef: {
        __type: "Pointer",
        className: "CampaignInfo",
        objectId: campaignInfoId,
      },
      donorUserId,
      orderId: order.id,
      amount: amount,
      currency: order.currency,
    });

    const fundRaiseSaveResponse = await fundRaiserInfo.save();

    if (!fundRaiseSaveResponse) {
      throw new Error("Could not save the order.");
    }

    return {
      ...order,
      objectId: fundRaiseSaveResponse.objectId,
    };
  } catch (error) {
    throw new Error(error);
  }
});

Parse.Cloud.define("payment_success", async (request, res) => {
  try {
    const { orderCreationId, paymentId, razorpayOrderId, razorpaySignature } =
      request.params;

    const shasum = crypto.createHmac(
      "sha256",
      PAYMENT_CREDENTIALS.RAZORPAY_SECRET
    );
    shasum.update(`${orderCreationId}|${paymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature) throw "Transaction not legit!";

    const fundRaiserInfo = new Parse.Query("FundRaiserInfo");
    fundRaiserInfo.equalTo("orderId", orderCreationId);
    fundRaiserInfo.include("campaignInfoRef");

    const fundRaiser = await fundRaiserInfo.first();

    if (fundRaiser) {
      fundRaiser.set("status", "success");
      fundRaiser.set("paymentDetails", {
        orderId: razorpayOrderId,
        paymentId: paymentId,
        signature: razorpaySignature,
      });

      const results = await fundRaiser.save();

      const campaignQuery = new Parse.Query("CampaignInfo");
      campaignQuery.equalTo("objectId", fundRaiser.get("campaignInfoRef").id);
      const compaign = await campaignQuery.first();
      compaign.set(
        "raisedAmount",
        (compaign.get("raisedAmount") || 0) + fundRaiser.get("amount")
      );
      compaign.set("noOfDonors", (compaign.get("noOfDonors") || 0) + 1);

      const saveRes = await compaign.save();

      if (results) {
        return results;
      }
    } else {
      throw new Error("Order did not match.");
    }
  } catch (error) {
    throw error;
  }
});

Parse.Cloud.define("payment_failed", async (request, res) => {
  try {
    const { objectId } = request.params;

    const fundRaiserInfo = new Parse.Query("FundRaiserInfo");
    fundRaiserInfo.equalTo("objectId", objectId);

    const fundRaiserInfoObject = await fundRaiserInfo.find();

    if (!fundRaiserInfoObject) throw "Invalid Order Details";

    fundRaiserInfoObject.set("status", "failed");

    await fundRaiserInfoObject.save();

    return false;
  } catch (error) {
    throw error;
  }
});

Parse.Cloud.define("getorders", async (request) => {
  const { userId } = request.params;

  const fundRaiserInfo = new Parse.Query("FundRaiserInfo");

  fundRaiserInfo.equalTo("donorUserId", userId);
  fundRaiserInfo.include("campaignInfoRef");

  const fundRaiserInfoObject = await fundRaiserInfo.find();

  return fundRaiserInfoObject;
});
