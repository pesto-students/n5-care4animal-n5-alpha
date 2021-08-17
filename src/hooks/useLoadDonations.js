const { useState } = require("react");
const { useDispatch } = require("react-redux");
const { getOrders } = require("services/ordersService");

export default function useLoadDonations(params) {
  const [isLoading, setLoadingStatus] = useState(false);
  const [donations, setDonations] = useState([]);
  const dispatch = useDispatch();

  const loadDonations = async (sessionToken, userId) => {
    setLoadingStatus(true);
    const { data, error } = await getOrders(sessionToken, { userId });

    if (data && data.result && data.result.length) {
      data.result.map((record) => {
        record["id"] = record.objectId;
      });
      setDonations(data.result);
    }
    setLoadingStatus(false);
  };

  return [isLoading, donations, loadDonations];
}
