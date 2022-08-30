import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { AppBar, Drawer } from "../drawer/drawer";
import HeaderMenu from "../header-menu/header-menu";
import { Outlet } from "react-router-dom";
import clientLogo from "../../assets/logo/logo-trans.png";
import Logo from "../../assets/app_logo/app_l.png";
import DrawerItems from "../drawer-items/drawer-items";
import { scrollbarUseStyles } from "../../custom-mui-style/custom-mui-styles";

const BaseComponent = () => {
  const theme = scrollbarUseStyles();
  return (
    <Box varient="div" component="div" sx={{ display: "flex" }} className={classess.appPage}>
      <CssBaseline />
      <AppBar position="fixed" open={true} className={classess.appPage__appbar}>
        <Toolbar sx={{ padding: { xs: "0 20px", sm: "0 20px", lg: "0 60px" } }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={classess.appPage__appbar__toolContainer}
          >
            <div className={classess.appPage__appbar__l_contain}>
              <h2>
                <img
                  src={clientLogo}
                  className={classess.appPage__appbar__client_logo}
                  alt="venture logo"
                />
              </h2>
            </div>
            <HeaderMenu />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={true}
        className={classess.appPage__drawer}
      >
        <DrawerItems />
        <div
          className={classess.appPage__drawer__footer_icon}
          style={{ display: 'flex' }}
        >
          <img
            className={classess.appPage__drawer__footer_icon__image}
            src={Logo}
            alt="logo"
          />
          <div className={classess.appPage__drawer__footer_icon__content}>
            <span
              className={classess.appPage__drawer__footer_icon__content__small}
            >
              Powered by
            </span>
            <span
              className={classess.appPage__drawer__footer_icon__content__big}
            >
              Black Lion
            </span>
          </div>
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, mt: 15 }} className={theme.global}>
        <Typography variant="div" component="div" sx={{ pb: 10 }}>
          <Outlet />
        </Typography>
        <footer className={classess.appPage__footer}>
          © {new Date().getFullYear()}. Black Lion. All rights reserved.
        </footer>
      </Box>
    </Box>
  );
};

export default BaseComponent;
