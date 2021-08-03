import { Button } from "@material-ui/core";
import { SectionHeader } from "components/Shared/SectionHeader";

export const Hero = ({ showStartCampaign }) => {
  return (
    <div className="hero-content">
      <SectionHeader
        data={{
          h3: "Be the voice for a voiceless?",
          subtitle1: "They need hero like you. Be their HERO",
        }}
      />
      <br />
      <Button
        className="hero-button"
        variant="contained"
        color="primary"
        onClick={showStartCampaign}
      >
        Start a Campaign{" "}
      </Button>
    </div>
  );
};
