import { useState } from "react";
import { getCampaignDetails } from "services/campaignService";

export default function useLoadCampaignDetails(params) {
  const [isLoading, setLoadingStatus] = useState(false);
  const [campaign, setCampaign] = useState([]);

  const loadDetails = async (campaignId) => {
    setLoadingStatus(true);
    const { data } = await getCampaignDetails({
      campaignId,
    });

    if (data && data.result) {
      setCampaign(data.result[0]);
    }
    setLoadingStatus(false);
  };

  return [isLoading, campaign, loadDetails];
}
