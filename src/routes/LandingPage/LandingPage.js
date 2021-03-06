import React from "react";
import "styles/LandingPage.scss";
import { Box } from "@material-ui/core";
import { HowItWorks } from "containers";
import { InfoSection } from "containers";
import TrendingCampaigns from "containers/TrendingCampaignSection";
import { Hero } from "containers";

export const LandingPage = ({ history }) => {
  const showDetails = (id) => {
    history.push(`/details/${id}`);
  };

  const showStartCampaign = () => {
    history.push(`/createcampaign`);
  };

  const showSearchPage = () => {
    history.push(`/search`);
  };

  return (
    <>
      <section className="hero heroimage">
        <Hero
          data={{
            h3: "Be the voice for a voiceless?",
            subtitle1: "They need hero like you. Be their HERO",
          }}
          showStartCampaign={showStartCampaign}
        />
      </section>

      <div className="top-section">
        <section className="host">
          <Box py={4}>
            <TrendingCampaigns showDetails={showDetails} />
          </Box>
        </section>
        <Box marginY={2}>
          <hr className="c4a-divider" />
        </Box>

        <section className="host">
          <Box py={4}>
            <InfoSection
              showStartCampaign={showStartCampaign}
              showSearchPage={showSearchPage}
            />
          </Box>
        </section>
        <Box marginY={2}>
          <hr className="c4a-divider" />
        </Box>
        <Box py={4}>
          <HowItWorks />
        </Box>
      </div>
    </>
  );
};
