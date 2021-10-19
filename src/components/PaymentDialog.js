import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Box,
  DialogActions,
  Grid,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";

export default function PaymentDialog({
  formik,
  handleClose,
  showConsentDialogue,
}) {
  const [consent, setConsent] = useState(showConsentDialogue);

  useEffect(() => {
    return () => {
      formik.handleReset();
    };
  }, []);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="payment-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      {consent ? (
        <>
          <DialogTitle id="form-dialog-title">
            <Grid justifyContent="space-between" container>
              <Grid item xs={10}>
                Are you sure, you want to fund your own campaign?
              </Grid>
              <Grid item>
                <IconButton edge="end" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <Box py={1} pr={2}>
            <DialogActions>
              <Button
                className="rounded-btn "
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="rounded-btn "
                variant="contained"
                color="primary"
                onClick={() => setConsent(false)}
              >
                Yes
              </Button>
            </DialogActions>
          </Box>
        </>
      ) : (
        <>
          <DialogTitle id="form-dialog-title">
            <Grid justifyContent="space-between" container>
              Enter donation amount
              <IconButton edge="end" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                margin="dense"
                id="amount"
                label="Amount to Donate"
                placeholder="Enter Amount you want to donate"
                type="number"
                fullWidth
              />
              <Box py={4} textAlign="center">
                <Button
                  className="rounded-btn "
                  variant="contained"
                  color="primary"
                  disabled={!formik.isValid}
                  type="submit"
                >
                  Proceed to pay ₹ {formik.values.amount}
                </Button>
              </Box>
            </form>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
