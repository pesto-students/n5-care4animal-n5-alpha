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
  const getRenderValue = (selected) => {
    let selectedValues = [];
    if (selected) {
      selectedCategories.forEach((selectedCategoryInstance) => {
        const matchedategory = categories.find(
          (categoryInstance) =>
            categoryInstance.objectId === selectedCategoryInstance
        );
        return matchedategory ? selectedValues.push(matchedategory.name) : "";
      });
    }
    return selectedValues.join(", ");
  };

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
          renderValue={getRenderValue}
        >
          {categories.map((category) => (
            <MenuItem key={category.objectId} value={category.objectId}>
              <Checkbox
                checked={selectedCategories.indexOf(category.objectId) > -1}
              />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
