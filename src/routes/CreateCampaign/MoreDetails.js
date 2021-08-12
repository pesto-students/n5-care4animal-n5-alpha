import TextField from "@material-ui/core/TextField";
import { SectionHeader } from "components/Shared/SectionHeader";

export const MoreDetailsForm = ({ formik }) => {
  return (
    <section>
      <SectionHeader
        data={{
          h4: "Few more details and then you are done.",
        }}
      />
      <div>
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <TextField
            type="number"
            margin="normal"
            fullWidth
            id="goalAmount"
            label="How much you want to raise"
            name="goalAmount"
            autoFocus
            value={formik.values.goalAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.goalAmount && Boolean(formik.errors.goalAmount)
            }
            helperText={formik.touched.goalAmount && formik.errors.goalAmount}
          />
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Campaign Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            name="description"
            label="Tell more about the Campaign"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </form>
      </div>
    </section>
  );
};
