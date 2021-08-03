import React, { useState } from "react";

import "styles/SearchCampaign.scss";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  ListItemText,
  Input,
  Checkbox,
  InputAdornment,
  IconButton,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Card } from "components/Card";

export const SearchCampagin = ({ history }) => {
  const [searchCriteria, setCriteria] = useState();

  const [selectedCategories, setCategories] = useState([]);
  const categories = ["Healthcare", "Animal Shelter", "Feeding"];

  const handleChange = (event) => {
    setCategories(event.target.value);
  };
  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  const triggerSearch = () => {
    return false;
  };

  const showDetails = (id) => {
    history.push(`/details/${id}`);
  };

  return (
    <div className="page-container">
      <section className="host">
        <div className="search-bar">
          <FormControl className="form-control">
            <InputLabel htmlFor="outlined-adornment-password">
              Search
            </InputLabel>
            <Input
              id="outlined-adornment-password"
              placeholder=" Enter keyword to search campaign"
              value={searchCriteria}
              onChange={handleCriteriaChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={triggerSearch}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className="form-control">
            <InputLabel id="demo-mutiple-checkbox-label">Filter by</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={selectedCategories}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
            >
              {categories.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedCategories.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </section>
      <Box marginY={4}>
        <hr />
      </Box>
      <section className="host">
        {" "}
        <section className="cards">
          {[0, 1, 2, 3, 4, 5].map((card) => {
            return <Card data={card} showDetails={showDetails} />;
          })}
        </section>
      </section>
    </div>
  );
};
