import { SectionHeader } from "components/Shared/SectionHeader";
import { NavLink } from "react-router-dom";
import { CampaignList } from "containers";
import { connect } from "react-redux";
import { useEffect } from "react";
import useLoadTrendingCampaigns from "hooks/useLoadTrendingCampaigns";

const TrendingCampaigns = ({ showDetails }) => {
  const [isLoading, campaigns, loadCampaigns] = useLoadTrendingCampaigns();

  useEffect(() => {
    if (!isLoading && !campaigns.length) {
      loadCampaigns();
    }
  }, []);

  if (!campaigns.length) {
    return "";
  }
  return (
    <>
      <section className="section-title section-container">
        <SectionHeader
          data={{
            h4: "TRENDING CAMPAIGNS",
            subtitle1: "View the Campaigns that are most active right now",
          }}
        />
      </section>
      <br />
      <CampaignList list={campaigns} showDetails={showDetails} />
      <br />
      <section className="view-more">
        <NavLink to="/search">View More..</NavLink>
      </section>
    </>
  );
};

export default TrendingCampaigns;
