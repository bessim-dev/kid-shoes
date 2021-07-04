import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "../../components/Orders/AddressForm";
import Review from "../../components/Orders/Review";
import { ServerContext } from "../../context/services/SendDataToServer";
import { CircularProgress, Snackbar } from "@material-ui/core";
import { useHistory } from "react-router";
import { cartContext } from "../../context/cart/cart.context";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    minWidth: 130,
  },
}));

const steps = ["Review your order", "Shipping address"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Review />;
    case 1:
      return <AddressForm />;
    default:
      throw new Error("Unknown step");
  }
}

const Order = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { loading, error, success, setSuccess } = useContext(ServerContext);
  const { clearCart } = useContext(cartContext);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const hundleSubmit = () => {
    document.getElementById("submitbut").click();
  };
  const history = useHistory();
  (() => {
    if (success) {
      clearCart();
      history.push("/");
      setSuccess(false);
    }
  })();
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          {error && (
            <Typography variant="subtitle1" color="error">
              {error}
            </Typography>
          )}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1 ? hundleSubmit : handleNext
                  }
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 && loading ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : activeStep === steps.length - 1 ? (
                    "Place order"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={false}
        autoHideDuration={6000}
        message="Note archived"
      />
    </React.Fragment>
  );
};
export default Order;
