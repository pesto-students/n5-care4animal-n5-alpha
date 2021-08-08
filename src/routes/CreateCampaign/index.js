import React, { useState } from "react";
import "styles/CreateCampaign.scss";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { ChooseACause } from "./cause-selector";
import { MoreDetailsForm } from "./more-details-form";
import { FileUploader } from "./file-uploader";

export const CreateCampaign = ({ history }) => {
  const [state, setState] = useState({
    activeStep: 0,
    seletedCause: "",
    goalAmount: "",
    name: "",
    description: "",
    campaignImage: "",
    proofFile: "",
  });

  const { activeStep } = state;

  const handleNext = () => {
    setState({ ...state, activeStep: activeStep + 1 });
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
      ...state,
      seletedCause: event.target.value,
    };
    setState(localState);
    // }
  };

  const handleInputChange = (value, name) => {
    let localState = { ...state };
    localState[name] = value;
    setState(localState);
  };

  const handleFileChange = (event) => {
    let localState = { ...state };
    const slFile = event.target.files;
    localState.proofFile = slFile[0];
    setState(localState);
  };

  const getContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <ChooseACause
            handleChange={onCauseSelect}
            seletedCause={state.seletedCause}
          />
        );

      case 1:
        return (
          <MoreDetailsForm
            handleInputChange={handleInputChange}
            detailState={state}
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
        shouldDisable = !state.seletedCause;
        break;

      case 1:
        shouldDisable = !state.goalAmount || !state.description;
        break;

      case 2:
        shouldDisable = !state.campaignImage;
        break;

      default:
        shouldDisable = false;
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
          </Stepper>
          <div className="campaign-form">{getContent()}</div>
          <div className="flex-bar">
            <Button
              // disabled={activeStep === 0}
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
        </div>
      </section>
    </div>
  );
};
