import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { SectionHeader } from "components/Shared/SectionHeader";

export const ChooseACause = ({ handleChange, seletedCause = "" }) => {
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
            value={seletedCause}
            onChange={handleChange}
            inputProps={{
              name: "campaign-cause",
              id: "campaign-cause",
            }}
          >
            <option value="">Choose a Cause for a Campaign</option>
            <option value={"HealthCare"}>HealthCare</option>
            <option value={"Feeding"}>Feeding</option>
            <option value={"Animal Shelter"}>Animal Shelter</option>
          </NativeSelect>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>

        {/* <FormControl>
          <NativeSelect
            value={seletedCause}
            onChange={handleChange}
            placeholder="Choose a Cause for a Campaign "
            input={<OutlinedInput name="receivingAccount" />}
          >
            <option value="">Choose a Cause for a Campaign</option>
            <option value={"HealthCare"}>HealthCare</option>
            <option value={"Feeding"}>Feeding</option>
            <option value={"Animal Shelter"}>Animal Shelter</option>
          </NativeSelect>
        </FormControl> */}
      </div>
    </div>
  );
};
