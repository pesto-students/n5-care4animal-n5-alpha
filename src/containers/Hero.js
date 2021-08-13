import { Box, Button } from "@material-ui/core";
import { SectionHeader } from "components/Shared/SectionHeader";

const Hero = ({ data, showStartCampaign }) => {
  return (
    <div className="hero-content">
      <SectionHeader data={{ ...data }} />
      {showStartCampaign && (
        <Box py={4}>
          <Button
            className="hero-button primary-btn"
            variant="contained"
            onClick={showStartCampaign}
          >
            Start a Campaign{" "}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Hero;
