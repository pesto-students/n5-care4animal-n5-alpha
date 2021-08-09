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
