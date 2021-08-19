import { Box } from "@material-ui/core";
import { SectionHeader } from "components/Shared/SectionHeader";
import { Link } from "react-router-dom";

const Hero = ({ data, showStartCampaign }) => {
  return (
    <div className="hero-content">
      <SectionHeader data={{ ...data }} />
      {showStartCampaign && (
        <Box py={6}>
          <Link to="/createcampaign" className="calltoAction">
            Start a Campaign
          </Link>
        </Box>
      )}
    </div>
  );
};

export default Hero;
