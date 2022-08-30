import React from 'react'
import classess from "./style.module.scss";
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import homeIcon from "../../assets/icons/home_icon.svg";
import artistIcon from "../../assets/icons/guitar_icon.svg";
import helpIcon from "../../assets/icons/help_icon.svg";
import musicIcon from "../../assets/icons/music.svg";
import logoutIcon from "../../assets/icons/logout_icon.svg";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../redux/slice/auth";
import { useDispatch } from 'react-redux';

const DrawerItems = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    return (
        <List className={classess.drawer_list} sx={{ marginLeft: 3 }}>
            <Box varient="div" component="div" className={classess.drawer_list__application_menu}>
                <ListItem
                    button
                    key={1}
                    onClick={() => {
                        navigation("/");
                    }}
                    className={classess.drawer_list__listitem}
                >
                    <ListItemIcon>
                        <img src={homeIcon} alt="home icon" />
                    </ListItemIcon>
                    <label className={classess.drawer_list__text}>
                        Home
                    </label>
                </ListItem>
                <ListItem
                    button
                    key={2}
                    onClick={() => {
                        navigation("/blig/my-songs");
                    }}
                    className={classess.drawer_list__listitem}
                >
                    <ListItemIcon>
                        <img src={musicIcon} alt="song icon" height={25} width={25} />
                    </ListItemIcon>
                    <label className={classess.drawer_list__text}>
                        My Songs
                    </label>
                </ListItem>
                <ListItem
                    button
                    key={2}
                    onClick={() => {
                        navigation("/blig/my-artist");
                    }}
                    className={classess.drawer_list__listitem}
                >
                    <ListItemIcon>
                        <img src={artistIcon} alt="artist icon" />
                    </ListItemIcon>
                    <label className={classess.drawer_list__text}>
                        My Artists
                    </label>
                </ListItem>
            </Box>


            <Box varient="div" component="div" className={classess.drawer_list__action_menu}>
                <ListItem
                    button
                    key={3}
                    onClick={() => {
                        navigation("/blig/help");
                    }}
                    className={classess.drawer_list__listitem}
                >
                    <ListItemIcon>
                        <img src={helpIcon} alt="help icon" />
                    </ListItemIcon>
                    <label className={classess.drawer_list__text}>
                        Help?
                    </label>
                </ListItem>
                <ListItem
                    button
                    key={4}
                    onClick={() => {
                        dispatch(logout());
                        navigation("/login");
                    }}
                    className={classess.drawer_list__listitem}
                >
                    <ListItemIcon>
                        <img src={logoutIcon} alt="logout icon" />
                    </ListItemIcon>
                    <label className={classess.drawer_list__text}>
                        Logout
                    </label>
                </ListItem>
            </Box>
        </List>
    )
}

export default DrawerItems