import useLoadDonations from "hooks/useLoadDonations";
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "components/Shared/Loader";
import { useSelector } from "react-redux";
import moment from "moment";
import { NO_DONATIONS } from "appconstants/messages";
import { Box } from "@material-ui/core";
import Currency from "components/Shared/Currency";
import { Link } from "react-router-dom";

const DonationsTable = () => {
  const [isLoading, donations, loadDonations] = useLoadDonations();
  const categories = useSelector(({ category }) => category.categories || []);
  const [sessionToken, userId] = useSelector(({ auth }) => {
    return [auth.user.sessionToken, auth.user.objectId];
  });

  useEffect(() => {
    if (!isLoading && userId) {
      loadDonations(sessionToken, userId);
    }
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Campaign Name",
      width: 300,
      valueGetter: (params) => params.row.campaignInfoRef.name,
      renderCell: (params) => (
        <Link to={`/details/${params.row.campaignInfoRef.objectId}`}>
          {" "}
          {params.row.campaignInfoRef.name}
        </Link>
      ),
    },
    {
      field: "campaignInfoRef",
      headerName: "Campaign Category",
      width: 300,
      valueGetter: (params) => {
        const categoryId = params.value.categoryRef.objectId;
        return categories.find(
          (categoryInstance) => categoryInstance.objectId === categoryId
        ).name;
      },
    },

    {
      field: "amount",
      headerName: "Donations Amount",
      width: 150,

      renderCell: (params) => <Currency value={params.value} />,
    },
    {
      field: "updatedAt",
      headerName: "Payment Date",
      width: 300,
      valueGetter: (params) => {
        return moment(params.value);
      },
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (!donations.length) {
    return (
      <Box py={10} textAlign="center">
        <h2> {NO_DONATIONS} </h2>;
      </Box>
    );
  }

  return (
    <div style={{ height: 350, width: "100%" }}>
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
