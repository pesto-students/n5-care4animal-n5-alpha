import { SectionHeader } from "components/Shared/SectionHeader";
import { NavLink } from "react-router-dom";
import { Card } from "components/Card";

export const TrendingCampaigns = ({ showDetails }) => {
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
      <section className="cards">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => {
          return <Card data={card} showDetails={showDetails} />;
        })}
      </section>
      <section className="view-more">
        <NavLink to="/search">View More..</NavLink>
      </section>
    </>
  );
};
