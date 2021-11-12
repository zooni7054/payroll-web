import React from "react";
import {
  Card,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authlogo from "../../../assets/img/authlogo.png";

import { AlertMessage } from "../../../components/Alert";

import store from "../../../redux/store";
import { setUser } from "../../../redux/actionCreators";

import { useHistory } from "react-router-dom";

import { updateToken } from "../../../utils/axios";
import { login } from "../../../apis/admin";

import { Helmet } from "react-helmet-async";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).required(),
});

function Login() {
  const history = useHistory();

  const [state, setState] = React.useState({ loading: false, user: null });

  React.useEffect(() => {
    if (localStorage.getItem("payroll_token")) {
      history.push("/admin");
    }
  }, []);

  const [propmt, setPropmt] = React.useState({
    type: "error",
    show: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    setPropmt({ ...propmt, show: false });
    setState({ ...state, loading: true });
    login(data)
      .then(function (result) {
        // handle success
        if (result.status == false) {
          setState({ ...state, loading: false });
          setPropmt({ type: "error", show: true, message: result.message });
        } else {
          setState({ ...state, loading: false });
          store.dispatch(setUser(result.data));
          setState({ ...state, user: result.data });
          setPropmt({
            type: "success",
            show: true,
            message: "Logged In Successfully",
          });
          // set token
          let token = JSON.parse(localStorage.getItem("payroll_token"));
          updateToken(token);
          history.push("/admin");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Staff Login</title>
      </Helmet>
      <AlertMessage propmt={propmt} />
      <Card
        sx={{
          marginTop: 8,
          paddingTop: "60px",
          paddingBottom: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar src={authlogo} variant="square" sx={{ m: 1, width: "260px" }} />
        <Typography
          component="span"
          variant="span"
          sx={{ mt: 1, fontSize: "18px" }}>
          Staff Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message ? errors.email?.message : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password ? true : false}
            helperText={
              errors.password?.message ? errors.password?.message : ""
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
            loading={state.loading}
            loadingIndicator="Logging In...">
            Login
          </LoadingButton>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
