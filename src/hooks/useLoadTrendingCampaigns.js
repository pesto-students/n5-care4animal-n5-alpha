import { useState } from "react";
import { getTrendinCampaigns } from "services/campaignService";

export default function useLoadTrendingCampaigns() {
  const [isLoading, setLoadingStatus] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    setLoadingStatus(true);
    const { data } = await getTrendinCampaigns();

    if (data && data.result) {
      setCampaigns(data.result);
    }
    setLoadingStatus(false);
  };

  return [isLoading, campaigns, loadCampaigns];
}
