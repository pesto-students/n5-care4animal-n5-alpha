import { useState } from "react";
import { connect } from "react-redux";

import "styles/Signin.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

import { requestLogin } from "store/actions/AuthActions";
import Loader from "components/Shared/Loader";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  submitted: false,
};

const SignIn = ({ loading, dispatch }) => {
  const [state, setLocalState] = useState(initialState);

  const handleChange = (evnt) => {
    const { name, value } = evnt.target;
    setLocalState({ ...state, [name]: value });
  };

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    setLocalState({ ...state, submitted: true });

    const { email, password } = state;
    if (email && password) {
      dispatch(requestLogin({ email, password }));
    }
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
        <Grid item lg={4} md={4} xs={12} className="signin-form">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate>
            <Grid container spacing={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={state.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={state.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Box my={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={""}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
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

export default connect(mapStateToProps)(SignIn);
