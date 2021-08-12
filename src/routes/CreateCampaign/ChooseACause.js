import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { SectionHeader } from "components/Shared/SectionHeader";
import { connect } from "react-redux";

const ChooseACause = ({ categories = [], formik }) => {
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
            value={formik.values.selectedCause}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.selectedCause &&
              Boolean(formik.errors.selectedCause)
            }
            inputProps={{
              name: "selectedCause",
              id: "selectedCause",
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
          <FormHelperText error>{formik.errors.selectedCause}</FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};

const mapStateToProps = ({ category }) => {
  return { categories: category.categories || [] };
};

export default connect(mapStateToProps)(ChooseACause);
