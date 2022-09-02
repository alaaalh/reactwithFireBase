import React from "react";
import "./styles.css";
import PhoneNumber from "./components/PhoneNumber";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { validator } from "./components/Validator";
import useForm from "./components/useForm";
import { type } from "@testing-library/user-event/dist/type";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  papper: {
    padding: "20px",
    width: "40vh",
    height: "50vh"
  }
}));

export default function App() {
  const initState = {
    email: "",
    password: "",
    phone: ""
  };

  const handleSubmit = (e) => {
    e.preventDefault()
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCy5_18qpxsWfq9WQ4cYBiJxp5r5WPVCdU'
      , {
        method: 'POST',
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          phon: state.phone,
          returnSecureToken: true
        }),
        headers: {
          'Content-type' : 'application/json'
        }
      }
      ).then(res => {
        if(res.ok){
          console.log('done')
        }else{
          return res.json().then(data =>{
          alert(data)
          })
        }
      })
    
  };

  const {
    handleChange,
    handleBlur,
    state,
    errors,
    countryCode
  } = useForm({
    initState,
    validator
  });

  let isValidForm =
    Object.values(errors).filter(error => typeof error !== "undefined")
      .length === 0;

  const { margin, papper } = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper className={papper} elevation={4} square={false}>
        <form onSubmit={handleSubmit}>
          <div>
            {/* EMAIL */}
            <TextField
              required
              label="Email"
              name="email"
              className={margin}
              defaultValue={state.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
              onBlur={handleBlur}
            />
            <br />
            {/* PASSWORD */}
            <TextField
              required
              label="Password"
              name="password"
              type="password"
              className={margin}
              defaultValue={state.password}
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
              onBlur={handleBlur}
            />
          </div>
          {/* PHONENUMBER */}
          <div className={margin}>
            <PhoneNumber
              errors={errors}
              state={state}
              handleChange={handleChange}
              handleBlur={handleBlur}
              countryCode={countryCode}
            />
          </div>
          <div>
            <Button
              disabled={!isValidForm}
              type="submit"
              variant="contained"
              color="primary"
              className={margin}
            >
              Next
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
}
