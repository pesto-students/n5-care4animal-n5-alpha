import { Button } from "@material-ui/core";
import { SectionHeader } from "components/Shared/SectionHeader";

const Hero = ({ data, showStartCampaign }) => {
  return (
    <div className="hero-content">
      <SectionHeader data={{ ...data }} />
      {showStartCampaign && (
        <>
          <br />
          <Button
            className="hero-button"
            variant="contained"
            color="secondary"
            onClick={showStartCampaign}
          >
            Start a Campaign{" "}
          </Button>
        </>
      )}
    </div>
  );
};

export default Hero;
