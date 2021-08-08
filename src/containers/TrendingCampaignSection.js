import { SectionHeader } from "components/Shared/SectionHeader";
import { NavLink } from "react-router-dom";
import { CampaignList } from "containers";

const TrendingCampaigns = ({ showDetails }) => {
  return (
    <>
      <section className="section-title section-container">
        <SectionHeader
          data={{
            h5: "TRENDING CAMPAIGNS",
            subtitle1: "View the Campaigns that are most active right now",
          }}
        />
      </section>
      <br />
      <CampaignList list={[0, 1, 2, 3]} showDetails={showDetails} />
      <br />
      <section className="view-more">
        <NavLink to="/search">View More..</NavLink>
      </section>
    </>
  );
};

export default TrendingCampaigns;
