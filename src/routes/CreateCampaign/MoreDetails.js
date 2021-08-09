import TextField from "@material-ui/core/TextField";
import { SectionHeader } from "components/Shared/SectionHeader";

export const MoreDetailsForm = ({ handleInputChange, detailState }) => {
  const { goalAmount, name, description } = detailState;

  return (
    <section>
      <SectionHeader
        data={{
          h4: "Few more details and then you are done.",
        }}
      />
      <div>
        <form className={""} noValidate>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            value={goalAmount}
            onChange={(event) =>
              handleInputChange(event.target.value, "goalAmount")
            }
            id="goalAmount"
            label="How much you want to raise"
            name="goalAmount"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            value={name}
            onChange={(event) => handleInputChange(event.target.value, "name")}
            id="name"
            label="Campaign Name"
            name="name"
            helperText="Write a clear, brief title that helps people quickly understand the goal of your campaign."
          />

          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(event) =>
              handleInputChange(event.target.value, "description")
            }
            id="description"
            label="Tell more about the Campaign"
            name="description"
            helperText="maximum 250 words."
          />
        </form>
      </div>
    </section>
  );
};
