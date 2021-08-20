import { InputLabel, TextField } from "@material-ui/core";
import { SectionHeader } from "components/Shared/SectionHeader";
import "styles/FileUploader.scss";
import FormHelperText from "@material-ui/core/FormHelperText";

export const FileUploader = ({ handleFileChange }) => {
  return (
    <section>
      <SectionHeader
        data={{
          h4: "One last thing and you are good to go.",
        }}
      />
      <br />
      <div>
        <form className={""} noValidate>
          <InputLabel className="campaignImage" htmlFor="campaignImage">
            Campaign Image{" "}
          </InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Upload a campaign pics"
            type="file"
            onChange={(event) => handleFileChange(event)}
            id="campaignImage"
            name="campaignImage"
          />
          <FormHelperText>
            Add an image that clearly represents your campaign. Choose one that
            looks good at different sizes—it’ll appear on your campaign page,
            across the Care4Animal website, and (when shared) on social
            channels. Your image should be at least 1024x576 pixels. It will be
            cropped to a 16:9 ratio.
          </FormHelperText>
        </form>
      </div>
    </section>
  );
};
