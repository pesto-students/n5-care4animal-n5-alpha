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

const CreateCampaign = ({
  loading,
  campaign = "",
  submitted,
  user,
  history,
  dispatch,
}) => {
  useEffect(() => {
    if (campaign) {
      dispatch(resetReducer());
      history.push(`/profile/${user.objectId}`);
    }
  }, [, campaign]);

  const [state, setState] = useState({
    activeStep: 0,
  });
  const [campaignFile, setFile] = useState();

  const [campaignState, setCampaignState] = useState({
    selectedCause: "",
    goalAmount: 0,
    name: "",
    description: "",
  });

  const { activeStep } = state;

  const handleNext = () => {
    if (activeStep === 2 && !submitted && !campaign) {
      const campaignPayload = generateCampaignPayload(campaignState, user);
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

  const onCauseSelect = (event) => {
    // if (event.target.value) {
    let localState = {
      ...campaignState,
      selectedCause: event.target.value,
    };
    setCampaignState(localState);
    // }
  };

  const handleInputChange = (value, name) => {
    let localState = { ...campaignState };

    if (name === "goalAmount") {
      localState[name] = +value;
    } else {
      localState[name] = value;
    }
    setCampaignState(localState);
  };

  const handleFileChange = (event) => {
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
  };

  const getContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <ChooseACause
            handleChange={onCauseSelect}
            selectedCause={campaignState.selectedCause}
          />
        );

      case 1:
        return (
          <MoreDetailsForm
            handleInputChange={handleInputChange}
            detailState={campaignState}
          />
        );

      case 2:
        return <FileUploader handleFileChange={handleFileChange} />;
      default:
        break;
    }
  };

  const stepActions = () => {
    if (activeStep === 0) {
      return "Next";
    }
    if (activeStep === 1) {
      return "Create a Campaign";
    }

    return "Save and Finish";
  };

  const steps = ["Cause", "More details", "Upload Image & Proofs"];

  const shouldNextDisabled = () => {
    let shouldDisable = false;

    switch (activeStep) {
      case 0:
        shouldDisable = !campaignState.selectedCause;
        break;

      case 1:
        shouldDisable =
          !campaignState.goalAmount ||
          !campaignState.name ||
          !campaignState.description;
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
