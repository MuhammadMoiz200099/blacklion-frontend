import React, { useEffect } from 'react';
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import barsIcon from "../../assets/icons/bars.svg";
import organizerIcon from "../../assets/icons/organizer.svg";
import Button from '@mui/material/Button';
import MySongsList from '../../components/my-songs-list/my-songs-list';

const MySongs = () => {
    return (
        <Container maxWidth="xl">
            <Box varient="div" component="div" className={classess.page}>
                <Box variant="div" component="div" className={classess.page__banner}>
                    <Typography variant="h5" gutterBottom component="div" className={classess.page__banner__title}>Playlist</Typography>
                    <Box varient="div" component="div" className={classess.page__banner__content}>
                        <Box varient="div" component="div">
                            <Typography variant="h3" fontWeight="bolder" gutterBottom component="div" sx={{ margin: 0 }} className={classess.page__banner__content__title}>Top Songs <br /> of the Week</Typography>
                        </Box>
                        <Box varient="div" component="div">
                            <Typography variant="body1" gutterBottom component="div" className={classess.page__banner__content__description}>
                                    Lorem ipsum dolor sit amet, consetetur sadipcing elitr, sed diam tempor invidunt ut labore et dolore magna aliquyam erat.
                            </Typography>
                        </Box>
                        <Box varient="div" component="div">
                            <Button variant="contained" sx={{ background: '#1A1A1A !important' }}>Trending Now</Button>
                        </Box>
                    </Box>
                </Box>
                <MySongsList />
            </Box >
        </Container>
    )
}

export default MySongs