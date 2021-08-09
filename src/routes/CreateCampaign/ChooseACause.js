import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { SectionHeader } from "components/Shared/SectionHeader";
import { connect } from "react-redux";

const ChooseACause = ({
  categories = [],
  handleChange,
  selectedCause = "",
}) => {
  return (
    <div>
      <SectionHeader
        data={{
          h4: "First, let’s get you set up.",
          body1:
            "Pick a campaign category to connect with a specific community",
        }}
      />
      <div>
        <FormControl>
          <NativeSelect
            value={selectedCause}
            onChange={handleChange}
            inputProps={{
              name: "campaign-cause",
              id: "campaign-cause",
            }}
          >
            <option value="">Choose a Cause for a Campaign</option>
            {categories.map((category) => (
              <option key={category.objectId} value={category.objectId}>
                {" "}
                {category.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    </div>
  );
};

const mapStateToProps = ({ category }) => {
  return { categories: category.categories || [] };
};

export default connect(mapStateToProps)(ChooseACause);
