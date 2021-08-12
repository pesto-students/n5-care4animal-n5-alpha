import React, { useEffect, useState } from "react";
import "styles/CreateCampaign.scss";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import ChooseACause from "./ChooseACause";
import { MoreDetailsForm } from "./MoreDetails";
import { FileUploader } from "./FileUploader";
import { connect } from "react-redux";
import {
  createCampaignAction,
  resetReducer,
} from "store/actions/CampaignActions";
import { generateCampaignPayload } from "utils.js/payloadCreator";
import Loader from "components/Shared/Loader";
import * as yup from "yup";
import { useFormik } from "formik";
import { requestLogin } from "store/actions/AuthActions";

const validationSchema = yup.object({
  selectedCause: yup
    .string("Cause for a campaign")
    .required("Please select a cause"),
  goalAmount: yup
    .number("Enter the goal amount to raise for your campaign")
    .min(500, "Goal amount should be ₹500 minimum")
    .required("Goal amount is required"),
  name: yup
    .string(
      "Write a clear, brief title that helps people quickly understand the goal of your campaign."
    )
    .min(10, "Name should have minimum 10 characters")
    .max(150, "Name should have maximun 150 characters")
    .required("Campaign name is required"),
  description: yup
    .string(
      "Write good description about you campaign, what you are doing and the purpose behind it."
    )
    .min(1000, "Description should have minimum 1000 characters")
    .max(10000, "Description should have maximun 10000 characters")
    .required("Description is must while creating a campaign"),
});

const initialState = {
  selectedCause: "",
  goalAmount: "",
  name: "",
  description: "",
};

const CreateCampaign = ({
  loading,
  campaign = "",
  submitted,
  user,
  history,
  dispatch,
}) => {
  useEffect(() => {
    if (campaign && submitted) {
      history.push(`/profile/${user.objectId}`);
    }

    return () => dispatch(resetReducer());
  }, [, campaign]);

  const [state, setState] = useState({
    activeStep: 0,
  });
  const [campaignFile, setFile] = useState();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.email && values.password) {
        dispatch(
          requestLogin({ email: values.email, password: values.password })
        );
      }
    },
  });

  const { activeStep } = state;

  const handleNext = () => {
    if (activeStep === 2 && !submitted && !campaign) {
      const campaignPayload = generateCampaignPayload(formik.values, user);
      dispatch(
        createCampaignAction({
          campaign: campaignPayload,
          campaignFile,
          sessionToken: user.sessionToken,
        })
      );
    } else {
      setState({ ...state, activeStep: activeStep + 1 });
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return history.goBack();
    }
    setState({ ...state, activeStep: activeStep - 1 });
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      var reader = new FileReader();
      reader.onloadend = async function () {
        const base64Response = await fetch(reader.result);
        const blob = await base64Response.blob();
        setFile({
          file: blob,
          name: selectedFile.name,
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const getContent = () => {
    switch (activeStep) {
      case 0:
        return <ChooseACause formik={formik} />;

      case 1:
        return <MoreDetailsForm formik={formik} />;

      case 2:
        return <FileUploader handleFileChange={handleFileChange} />;
      default:
        break;
    }
  };

  const stepActions = () => {
    if (activeStep < 2) {
      return "Next";
    }

    return "Create a Campaign";
  };

  const steps = ["Cause", "More details", "Upload Image & Proofs"];

  const shouldNextDisabled = () => {
    let shouldDisable = false;
    switch (activeStep) {
      case 0:
        shouldDisable = !formik.values.selectedCause;
        break;

      case 1:
        shouldDisable = !formik.isValid;
        break;

      case 2:
        shouldDisable = !campaignFile;
        break;

      default:
        shouldDisable = true;
        break;
    }

    return shouldDisable;
  };

  return (
    <div className="top-section">
      <section className="host">
        <div className="create-campaign">
          <Stepper className="stepper" activeStep={activeStep} alternativeLabel>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>{" "}
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="campaign-form">{getContent()}</div>
              <div className="flex-bar">
                <Button
                  disabled={submitted}
                  onClick={handleBack}
                  className="backButton"
                  size="large"
                >
                  Back
                </Button>

                <Button
                  disabled={shouldNextDisabled()}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  size="large"
                >
                  {stepActions()}
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ campaign, auth }) => {
  return { ...campaign, user: auth.user };
};

export default connect(mapStateToProps)(CreateCampaign);
