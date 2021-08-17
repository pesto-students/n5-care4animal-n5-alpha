import useLoadDonations from "hooks/useLoadDonations";
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "components/Shared/Loader";
import { useSelector } from "react-redux";
import moment from "moment";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "amount",
    headerName: "Donations Amount",
    width: 150,
  },
  {
    field: "updatedAt",
    headerName: "Payment Date",
    width: 300,
    valueGetter: (params) => {
      return moment(params.value);
    },
  },
  {
    field: "name",
    headerName: "Campaign Name",
    width: 300,
    valueGetter: (params) => params.row.campaignInfoRef.name,
  },
];

const DonationsTable = () => {
  const [isLoading, donations, loadDonations] = useLoadDonations();
  const [sessionToken, userId] = useSelector(({ auth }) => {
    return [auth.user.sessionToken, auth.user.objectId];
  });

  useEffect(() => {
    if (!isLoading && userId) {
      loadDonations(sessionToken, userId);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={donations}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
  );
};

export default DonationsTable;
