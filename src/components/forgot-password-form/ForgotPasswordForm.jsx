import React from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import logo from "./../../assets/app_logo/app_l.png";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { forgotpassword } from "../../redux/slice/auth";
import { config } from "../../enviorment/enviorment";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: event.target.email.value.toLocaleLowerCase(),
      host: config.CURRENT_HOST
    };
    dispatch(
      forgotpassword({
        data: payload,
      })
    );
    event.target.email.value = ""
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };
  return (
    <Box varient="div" component="div" className={classess.section}>
      <Box varient="div" component="div" className={classess.section__header}>
        <img
          src={logo}
          alt="app-logo"
          className={classess.section__header__img}
        />
        <h1>Forgot Password</h1>
      </Box>
      <form action="" className={classess.section__form} onSubmit={onSubmit}>
        <Box
          varient="div"
          component="div"
          className={classess.section__form__formfield}
        >
          <label className={classess.section__form__formfield__label}>
            E-mail ID
          </label>
          <FormControl variant="filled" color="info" fullWidth>
            <InputLabel htmlFor="component-filled">Email ID</InputLabel>
            <FilledInput
              id="component-filled"
              name="email"
              type="text"
              className={classess.section__form__formfield__inputs}
              required
            />
          </FormControl>
        </Box>
        <Divider sx={{ background: "#286397", mt: 2, mb: 2 }} />
        <Box
          varient="div"
          component="div"
          className={classess.section__form__actions}
          sx={{
            flexDirection: { xs: "column", sm: "column", lg: "row" },
            gap: { xs: 2, sm: 2, lg: 0 },
          }}
        >
          <Button
            type="submit"
            className={classess.section__form__actions__btn_pink}
            variant="contained"
            sx={{ width: { xs: "100%", sm: "100%", lg: "45%" } }}
          >
            Reset Password
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPasswordForm;
