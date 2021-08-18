import React, { useEffect, useState } from "react";

import "styles/SearchCampaign.scss";

import { SearchBar } from "./SearchBar";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { CampaignList } from "containers";
import { Hero } from "containers";
import { connect } from "react-redux";
import {
  loadAllCampaignsAction,
  searchCampaignsAction,
} from "store/actions/CampaignActions";
import Loader from "components/Shared/Loader";

const SearchCampagin = ({
  loading,
  campaigns = [],
  history,
  categories,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(loadAllCampaignsAction());
  }, []);
  const [searchCriteria, setCriteria] = useState();

  const [selectedCategories, setCategories] = useState([]);

  const handleChange = (event) => {
    setCategories(event.target.value);
    triggerSearch();
  };
  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  const triggerSearch = () => {
    dispatch(
      searchCampaignsAction({
        searchKey: searchCriteria,
        categories: selectedCategories,
      })
    );
  };

  const showDetails = (id) => {
    history.push(`/details/${id}`);
  };

  const renderCampaigns = () => {
    return campaigns.length ? (
      <CampaignList list={campaigns} showDetails={showDetails} />
    ) : (
      <Box textAlign="center" py={4}>
        <Typography variant="h5">
          No Campaigns Found. Modify the search query.
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <section className="second-hero">
        <Hero
          data={{
            h3: "Search Campaigns",
            subtitle1: "Choose from 10k Campaigns to support",
          }}
        />
      </section>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Campaigns
          </Typography>
          <div className="search-bar">
            <SearchBar
              {...{
                searchCriteria,
                selectedCategories,
                categories,
                handleChange,
                handleCriteriaChange,
                triggerSearch,
              }}
            />
          </div>
          <Box marginY={4}>
            <hr />
          </Box>

          <Grid item xs={12}>
            {loading ? <Loader /> : renderCampaigns()}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = ({ campaign, category }) => {
  return { ...campaign, ...category };
};

export default connect(mapStateToProps)(SearchCampagin);
