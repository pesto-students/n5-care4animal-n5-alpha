import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import statesList from "./StatesList";

const AccountProfileDetails = ({ user = {}, onSubmitChanges }) => {
  const { firstName, lastName, email, username, phone, state, country } = user;
  const [values, setValues] = useState({
    firstName,
    lastName,
    email,
    username,
    phone,
    state,
    country,
  });

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setValues({
        ...values,
        email: event.target.value,
        username: event.target.value,
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <form autoComplete="off" noValidate>
      <CardHeader title="Profile" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              helperText="Please specify the first name"
              label="First name"
              name="firstName"
              onChange={handleChange}
              required
              value={values.firstName}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              onChange={handleChange}
              required
              value={values.lastName}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChange}
              required
              value={values.email}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              onChange={handleChange}
              value={values.phone}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              onChange={handleChange}
              required
              value={values.country}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Select State"
              name="state"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.state}
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
          onClick={() => onSubmitChanges(values)}
        >
          Save details
        </Button>
      </Box>
    </form>
  );
};

export default AccountProfileDetails;
