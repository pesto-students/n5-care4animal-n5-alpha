import { Campaign } from "components/Campaign";

const CampaignList = ({ list = [], showDetails }) => {
  return (
    <section className="cards">
      {list.map((campaign, index) => {
        return (
          <Campaign
            campaign={campaign}
            key={campaign.name + index}
            showDetails={showDetails}
          />
        );
      })}
    </section>
  );
};

export default CampaignList;
