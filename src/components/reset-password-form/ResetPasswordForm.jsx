import React, { useState } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import logo from "./../../assets/app_logo/app_l.png";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { resetpassword } from "../../redux/slice/auth";
import { _fetchToken } from "../../utils/spotifyApiServiceHandler";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordIcon, setPasswordIcon] = useState('password');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('password');

  const onSubmit = (event) => {
    event.preventDefault();

    if (event.target.password.value === event.target.repassword.value) {
      const payload = {
        password: event.target.password.value,
        token,
      };
      dispatch(
        resetpassword({
          data: payload,
        })
      );
      event.target.password.value = "";
      event.target.repassword.value = "";
      setTimeout(() => {
        navigate('/login');
      }, 750);
    } else {
      toast.error("Password must be matched");
    }
  };

  return (
    <Box varient="div" component="div" className={classess.section}>
      <Box varient="div" component="div" className={classess.section__header}>
        <img
          src={logo}
          alt="app-logo"
          className={classess.section__header__img}
        />
        <h1>Reset Password</h1>
      </Box>
      <form action="" className={classess.section__form} onSubmit={onSubmit}>
        <Box
          varient="div"
          component="div"
          className={classess.section__form__formfield}
        >
          <label className={classess.section__form__formfield__label}>
            Password
          </label>
          <FormControl variant="filled" color="info" fullWidth>
            <InputLabel htmlFor="component-filled">Password</InputLabel>
            <Box varient="div" component="div" sx={{ position: 'relative', width: '100%' }}>
              <FilledInput
                id="component-filled"
                name="password"
                type={passwordIcon}
                className={classess.section__form__formfield__inputs}
                required
              />
              <Box varient="div" component="div" sx={{ position: 'absolute', right: '18px', top: '18px', color: '#62666c' }}>
                {passwordIcon === 'password' ? (
                  <FiEyeOff fontSize={22} cursor="pointer" onClick={() => setPasswordIcon('text')} />
                ) : (
                  <FiEye fontSize={22} cursor="pointer" onClick={() => setPasswordIcon('password')} />
                )}
              </Box>
            </Box>
          </FormControl>
        </Box>
        <Box
          varient="div"
          component="div"
          className={classess.section__form__formfield}
        >
          <label className={classess.section__form__formfield__label}>
            Confirm Password
          </label>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="component-filled">Confirm Password</InputLabel>
            <Box varient="div" component="div" sx={{ position: 'relative', width: '100%' }}>
              <FilledInput
                id="component-filled"
                name="repassword"
                type={confirmPasswordIcon}
                className={classess.section__form__formfield__inputs}
                required
              />
              <Box varient="div" component="div" sx={{ position: 'absolute', right: '18px', top: '18px', color: '#62666c' }}>
                {confirmPasswordIcon === 'password' ? (
                  <FiEyeOff fontSize={22} cursor="pointer" onClick={() => setConfirmPasswordIcon('text')} />
                ) : (
                  <FiEye fontSize={22} cursor="pointer" onClick={() => setConfirmPasswordIcon('password')} />
                )}
              </Box>
            </Box>
          </FormControl>
        </Box>

        <Divider sx={{ background: "#286397", mt: 4, mb: 3 }} />

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
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
