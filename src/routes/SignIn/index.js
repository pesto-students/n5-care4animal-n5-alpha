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
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const initialState = {
  email: "Advikp@gmail.com",
  password: "Test@1234",
};

const SignIn = ({ loading, dispatch }) => {
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.email && values.password) {
        dispatch(
          requestLogin({ email: values.email, password: values.password })
        );
      }
    },
  });

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
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Box my={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={""}
                disabled={!formik.isValid}
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
