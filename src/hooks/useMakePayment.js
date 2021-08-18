import { useState } from "react";
import {
  createOrder,
  handleOrderSuccess,
  handleOrderFailure,
} from "services/ordersService";
import logo from "assets/images/Logo.png";
import {
  errorAlertAction,
  successAlertAction,
} from "store/actions/AlertActions";
import { useDispatch } from "react-redux";

function useMakePayment() {
  const [status, setStatus] = useState("");
  const [paymentInProgress, setPaymentProgressStatus] = useState(false);
  const dispatch = useDispatch();

  let razorPayWindow = "";

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handleSuccess = async (sessionToken, orderObjectId, response) => {
    const data = {
      objectId: orderObjectId,
      orderCreationId: orderObjectId,
      paymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
    };

    const result = await handleOrderSuccess(sessionToken, data);
    if (razorPayWindow && razorPayWindow.close) {
      razorPayWindow.close();
    }
    if (result) {
      dispatch(successAlertAction("Payment Successful"));
    }
    setPaymentProgressStatus(false);
    setStatus("success");
  };

  const handleFailure = async (sessionToken, orderObjectId, response) => {
    console.log(sessionToken, orderObjectId, response);
  };

  const getOptions = (sessionToken, orderObjectId, currency, user) => {
    const options = {
      key: "rzp_test_NybzyAbZNToaGG",
      currency: currency,
      name: "Care4Animal",
      description: "Test Transaction",
      image: { logo },
      order_id: orderObjectId,
      prefill: {
        name: user.firstName,
        contact: user.phoneNumber ? user.phoneNumber : "!234567890",
        email: user.email,
      },
      handler: (response) =>
        handleSuccess(sessionToken, orderObjectId, response),
      notes: {
        address: "Example Corporate Office",
      },
      modal: {
        ondismiss: function (res) {
          setPaymentProgressStatus(false);
          setStatus("Payment cancelled.");
          dispatch(errorAlertAction("Payment cancelled"));
        },
      },
      theme: {
        color: "#61dafb",
      },
    };

    return options;
  };

  const makePayment = async (sessionToken, params, user) => {
    setPaymentProgressStatus(true);
    setStatus(false);
    if (typeof window.Razorpay === undefined) {
      const loadScriptResult = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!loadScriptResult) {
        dispatch(
          errorAlertAction("Razorpay SDK failed to load. Are you online?")
        );
        setPaymentProgressStatus(false);
      }
    }

    const orderPayload = { ...params };

    const { error, data } = await createOrder(sessionToken, orderPayload);

    if (error) {
      setPaymentProgressStatus(false);
      setStatus(error);
      dispatch(errorAlertAction("Failed to create an order."));
    }

    if (data && data.result) {
      const { id: order_id, currency } = data.result;
      const orderObjectId = order_id;
      const options = getOptions(sessionToken, orderObjectId, currency, user);
      razorPayWindow = new window.Razorpay(options);
      razorPayWindow.on("payment.failed", (response) =>
        handleFailure(sessionToken, orderObjectId, response)
      );
      razorPayWindow.open();
    } else {
      setPaymentProgressStatus(false);
      setStatus(
        "An error has occurred. Please contact the tech support help desk to notify them of the issue."
      );
      dispatch(
        errorAlertAction(
          "An error has occurred. Please contact the tech support help desk to notify them of the issue."
        )
      );
    }
  };

  return {
    status,
    paymentInProgress,
    makePayment,
  };
}

export default useMakePayment;
