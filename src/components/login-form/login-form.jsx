import React, { useState } from "react";
import Box from "@mui/material/Box";
import classess from "./style.module.scss";
import logo from "./../../assets/app_logo/app_l.png";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
// icons
import google from "./../../assets/google.svg";
import linkedin from "./../../assets/linkedin.svg";
import instagram from "./../../assets/instagram.svg";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/auth";
import { Link, useNavigate } from "react-router-dom";
import { _fetchToken } from "../../utils/spotifyApiServiceHandler";
import { FiEyeOff, FiEye } from "react-icons/fi";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordIcon, setPasswordIcon] = useState('password');
  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: event.target.email.value.toLocaleLowerCase(),
      password: event.target.password.value,
    };
    fetchSpotifyToken();
    dispatch(
      login({
        data: payload,
      })
    );
    event.target.email.value = "";
    event.target.password.value = "";
  };

  const fetchSpotifyToken = async () => await _fetchToken();

  return (
    <Box varient="div" component="div" className={classess.section}>
      <Box varient="div" component="div" className={classess.section__header}>
        <img
          src={logo}
          alt="app-logo"
          className={classess.section__header__img}
        />
        <h1>Welcome to Black Lion</h1>
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
        <Box
          varient="div"
          component="div"
          className={classess.section__form__formfield}
        >
          <label className={classess.section__form__formfield__label}>
            Password
          </label>
          <FormControl variant="filled" fullWidth>
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
          className={classess.section__form__actions}
          sx={{
            flexDirection: { xs: "column", sm: "column", lg: "row" },
            gap: { xs: 2, sm: 2, lg: 0 },
          }}
        >
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
            sx={{ color: "white" }}
          />

          <Button
            onClick={() => navigate("/forgot-password")}
            variant="text"
            sx={{ width: { xs: "100%", sm: "100%", lg: "45%" } }}
          >
            Forgot Password
          </Button>
        </Box>
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
            Sign In
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{
              background: "#36A1FF",
              width: { xs: "100%", sm: "100%", lg: "45%" },
            }}
            onClick={() => navigate("/signup")}
          >
            Register now
          </Button>
        </Box>
      </form>
      <Divider sx={{ background: "#286397", mt: 4, mb: 3 }} />
      <Typography
        variant="body2"
        component="div"
        sx={{ color: "#FFFFFF", textAlign: "center" }}
      >
        Or Login with the following
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "column", lg: "row" }}
        justifyContent={"space-between"}
        gap={{ xs: 2, sm: 2, lg: 0 }}
        mt={3}
      >
        <Button
          className={classess.section__btn_styl}
          variant="contained"
          sx={{ background: "#FFFFFF", minWidth: "100px" }}
          mb={4}
        >
          <img
            src={google}
            alt="google icon"
            className={classess.section__btn_icons}
          />
        </Button>
        <Button
          className={classess.section__btn_styl}
          variant="contained"
          sx={{ background: "#FFFFFF", minWidth: "100px" }}
        >
          <img
            src={linkedin}
            alt="linkedin icon"
            className={classess.section__btn_icons}
          />
        </Button>
        <Button
          className={classess.section__btn_styl}
          variant="contained"
          sx={{ background: "#FFFFFF", minWidth: "100px" }}
        >
          <img
            src={instagram}
            alt="instagram"
            className={classess.section__btn_icons}
          />
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
