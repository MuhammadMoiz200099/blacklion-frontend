import React, { useEffect, useState } from 'react';
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import barsIcon from "../../assets/icons/bars.svg";
import organizerIcon from "../../assets/icons/organizer.svg";
import Button from '@mui/material/Button';
import MyArtistList from '../../components/my-artist-list/my-artist-list';

const MyArtist = () => {
    const [selectedView, setSelectedView] = useState('list');
    return (
        <Container maxWidth="xl">
            <Box varient="div" component="div" className={classess.page}>
                <Box varient="div" component="div" className={classess.page__title_bar}>
                    <Typography variant="h5" gutterBottom component="div" className={classess.page__title_bar__title}>Trending</Typography>
                    <Box className={classess.page__title_bar__icons}>
                        <img src={organizerIcon} alt="organizer icon" style={{ opacity: selectedView === 'grid' ? 1 : 0.5 }} onClick={() => setSelectedView('grid')} />
                        <img src={barsIcon} alt="bars icons" style={{ opacity: selectedView === 'list' ? 1 : 0.5 }} onClick={() => setSelectedView('list')} />
                    </Box>
                </Box>
                <Box variant="div" component="div" className={classess.page__banner}>
                    <Typography variant="h5" gutterBottom component="div" className={classess.page__banner__title}>Playlist</Typography>
                    <Box className={classess.page__banner__content}>
                        <Box>
                            <Typography variant="h3" fontWeight="bolder" gutterBottom component="div" sx={{ margin: 0 }} className={classess.page__banner__content__title}>Your Favorite<br />Artists</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" gutterBottom component="div" className={classess.page__banner__content__description}>
                                Lorem ipsum dolor sit amet, consetetur sadipcing elitr, sed diam tempor invidunt ut labore et dolore magna aliquyam erat.
                            </Typography>
                        </Box>
                        <Box>
                            <Button variant="contained" sx={{ background: '#1A1A1A !important' }}>Trending Now</Button>
                        </Box>
                    </Box>
                </Box>
                <MyArtistList selectedView={selectedView} />
            </Box >
        </Container>
    )
}

export default MyArtist