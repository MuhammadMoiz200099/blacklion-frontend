import React from 'react'
import classess from "./style.module.scss";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MainAppBar from '../../components/main-app-bar/main-app-bar'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GradientButton from '../../components/button/gradient-button/gradient-button';
import Typography from '@mui/material/Typography';
import SignupForm from '../../components/signup-form/signup-form';

const SignupContainer = () => {
    return (
        <Box varient="div" component="div" sx={{ display: 'flex', pb: { xs: 10, lg: 0 } }} className={classess.page}>
            <MainAppBar>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} lg={5}>
                        <Box varient="div" component="div" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0, sm: 6, lg: 10 }, textAlign: { xs: 'center', sm: 'left' } }} className={classess.page__detailsContainer}>
                            <Typography variant="div" component="div" sx={{ textAlign: { xs: 'center', sm: 'left' }, fontSize: { xs: 32, sm: 36, lg: 42 } }}>
                                Get Your Music on Social Platforms and <span className={classess.page__detailsContainer__text_highlight}>150+ Digital Stores</span> like Spotify, Apple Music, Tidal, YouTube, Instagram, TikTok and more
                            </Typography>
                            <Box varient="div" component="div">
                                <Box varient="div" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <ul className={classess.page__detailsContainer__ul}>
                                        <li className={classess.page__detailsContainer__ul__li}>
                                            <ArrowForwardIcon sx={{ fontSize: 18, fontWeight: 900, color: '#36A1FF' }} />
                                            <span>Unlimited Worldwide Music Distribution</span>
                                        </li>
                                        <li className={classess.page__detailsContainer__ul__li}>
                                            <ArrowForwardIcon sx={{ fontSize: 18, fontWeight: 900, color: '#36A1FF' }} />
                                            <span>Unlimited Releases to Social Platforms</span>
                                        </li>
                                        <li className={classess.page__detailsContainer__ul__li}>
                                            <ArrowForwardIcon sx={{ fontSize: 18, fontWeight: 900, color: '#36A1FF' }} />
                                            <span>Comprehensive Sales Data</span>
                                        </li>
                                    </ul>
                                </Box>
                                <GradientButton text={"LEARN MORE"} style={{ marginTop: 40 }} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={7} lg={7}>
                        <Box varient="div" component="div" className={classess.page__login_section}>
                            <Box varient="div" component="div" sx={{ width: { xs: "100%", sm: "100%", lg: "100%" } }} className={classess.page__login_section__login_box}>
                                <SignupForm />
                            </Box>
                            <Typography variant="caption" display="block" className={classess.page__login_section__coptrights} gutterBottom>
                                © {new Date().getFullYear()}. Black Lion. All rights reserved.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </MainAppBar>
        </Box>
    )
}

export default SignupContainer