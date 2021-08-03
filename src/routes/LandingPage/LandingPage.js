import React from "react";
import "styles/LandingPage.scss";
import { Box } from "@material-ui/core";
import { HowItWorks } from "containers/HowItWorks/HowItWorksSection";
import { SectionInfo } from "containers/InfoSection/InfoSection-";
import { TrendingCampaigns } from "containers/TrendingCampaignSection.js/TrendingCampaigns";
import { Hero } from "containers/Hero/hero";

export const LandingPage = ({ history }) => {
  const showDetails = (id) => {
    history.push(`/details/${id}`);
  };

  const showStartCampaign = () => {
    history.push(`/createcampaign`);
  };

  return (
    <>
      <section className="hero">
        <Hero showStartCampaign={showStartCampaign} />
      </section>
      <div className="top-section">
        <section className="host">
          <TrendingCampaigns showDetails={showDetails} />
        </section>
        <Box marginY={2}>
          <hr className="c4a-divider" />
        </Box>
        <section className="host">
          <SectionInfo />
        </section>
        <Box marginY={2}>
          <hr className="c4a-divider" />
        </Box>
        <HowItWorks />
      </div>
    </>
  );
};
