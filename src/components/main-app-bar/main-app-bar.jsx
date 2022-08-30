import React, { useState } from 'react'
import classess from "./style.module.scss";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import LOGO from "./../../assets/logo/logo-trans.png"

const MainAppBar = ({ children }) => {
    const navItems = ['Artist', 'Investors', 'Partners', 'Settings'];
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box varient="div" component="div" className={classess.page}>
            <AppBar position="static" component="nav" className={classess.page__app_bar}>
                <Container component="div">
                    <Toolbar disableGutters>
                        <Box varient="div" component="div" sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon fontSize='24' />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {navItems.map((item, idx) => (
                                    <MenuItem key={idx} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{item}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            <img src={LOGO} alt="blacklion logo" className={classess.page__app_bar__logo} />
                        </Typography>
                        <Box varient="div" component="div" sx={{ display: { xs: 'none', sm: 'flex' }, gap: { sm: 2, lg: 5 } }}>
                            {navItems.map((item, idx) => (
                                <Button key={idx} sx={{ color: '#fff' }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box varient="div" component="div" sx={{ width: "100%" }}>
                <Container>
                    {children}
                </Container>
            </Box>
        </Box>
    )
}

AppBar.propTypes = {
    children: PropTypes.any,
};

export default MainAppBar