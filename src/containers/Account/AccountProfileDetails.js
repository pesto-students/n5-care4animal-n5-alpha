import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import statesList from "./StatesList";
import "yup-phone";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  firstName: yup
    .string("Please enter the valid first name")
    .min(1, "First name should have atleast 1 character.")
    .max(35, "First name cant have more than 35 characters.")
    .required("Please enter the valid first name"),

  lastName: yup
    .string("Please enter the valid last name")
    .min(1, "Last name should have atleast 1 character.")
    .max(35, "First name cant have more than 35 characters.")
    .required("Please enter the valid last name"),

  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),

  phone: yup.string().phone().required("Phone number is required."),
  state: yup.string("Please enter your State").required("State is required"),
  country: yup
    .string("Please choose your Country")
    .required("Country is required"),
});

const AccountProfileDetails = ({ user = {}, onSubmitChanges }) => {
  const { firstName, lastName, email, phone, state, country } = user;

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      phone,
      state,
      country,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmitChanges({ ...values, username: values.email });
    },
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <CardHeader title="Profile" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              helperText="Please specify the first name"
              label="First name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Select State"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              select
              SelectProps={{ native: true }}
            >
              {statesList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          variant="contained"
          disabled={!formik.isValid}
          type="submit"
        >
          Save details
        </Button>
      </Box>
    </form>
  );
};

export default AccountProfileDetails;
