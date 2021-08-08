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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export const SearchBar = ({
  handleChange,
  searchCriteria,
  selectedCategories,
  categories,
  handleCriteriaChange,
  triggerSearch,
}) => {
  return (
    <>
      <FormControl className="form-control">
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
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
          labelwidths={70}
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
    </>
  );
};
