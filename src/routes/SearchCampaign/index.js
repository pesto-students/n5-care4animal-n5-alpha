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

const SearchCampagin = ({ campaigns = [], history, categories, dispatch }) => {
  const [searchCriteria, setCriteria] = useState();

  const [selectedCategories, setCategories] = useState([]);

  const handleChange = (event) => {
    setCategories(event.target.value);
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
            <CampaignList list={campaigns} showDetails={showDetails} />
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
