import { useEffect, useState } from "react";
import "styles/Signup.scss";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { requestUserRegistration } from "store/actions/AuthActions";
import Loader from "components/Shared/Loader";
import { Link } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUp = ({ loading, dispatch }) => {
  const [state, setLocalState] = useState(initialState);

  const handleChange = (evnt) => {
    const { name, value } = evnt.target;
    setLocalState({ ...state, [name]: value });
  };

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    setLocalState({ ...state });
    const { submitted, ...userPayload } = state;
    dispatch(
      requestUserRegistration({ ...userPayload, username: state.email })
    );
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "70vh" }}
    >
      {loading ? (
        <Loader />
      ) : (
        <Grid item lg={4} md={4} xs={12} className="signup-form">
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <br />
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={state.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={state.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={state.password}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Box my={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Box>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = ({ auth }) => {
  return { ...auth };
};

export default connect(mapStateToProps)(SignUp);
