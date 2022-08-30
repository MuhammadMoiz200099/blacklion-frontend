import React, { useState } from 'react'
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import barsIcon from "../../assets/icons/bars.svg";
import homeBannerIcon from "../../assets/avatar/avatar2.avif";
import Avatar from '@mui/material/Avatar';
import ArtistList from '../../components/artist-list/artist-list';
import { useSelector } from 'react-redux';
import organizerIcon from "../../assets/icons/organizer.svg";

const Home = () => {
    const user = useSelector((state) => state.auth.user);
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
                    <Box
                        variant="div"
                        component="div"
                        className={classess.page__banner__imagleCircle}
                    >
                        <Box
                            variant="div"
                            component="div"
                            className={classess.page__banner__imagleCircle__inner_cirlcle}
                        >
                            {user?.profilePicture ? (
                                <Avatar
                                    src={user?.profilePicture}
                                    alt={user?.firstName}
                                    sx={{ height: 165, width: 165 }}
                                />
                            ) : (
                                <Avatar
                                    src={homeBannerIcon}
                                    alt="Home Banner Icon"
                                    sx={{ height: 165, width: 165 }}
                                />
                            )}
                        </Box>
                    </Box>
                    <Box variant="div" component="div" className={classess.page__banner__details}>
                        <Typography variant="h4" gutterBottom>Welcome to Black Lion</Typography>
                        <Box variant="div" component="div" className={classess.page__banner__details__detail_contain}>
                            <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section}>
                                <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content}>
                                    <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content__key_container}>
                                        <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__key_container__key}>Full Name:</Typography>
                                    </Box>
                                    <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__value}>{user?.firstName || "N/A"} {user?.lastName || "N/A"}</Typography>
                                </Box>
                                <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content}>
                                    <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content__key_container}>
                                        <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__key_container__key}>Email Address:</Typography>
                                    </Box>
                                    <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__value}>{user?.email || "N/A"}</Typography>
                                </Box>
                                <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content}>
                                    <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content__key_container}>
                                        <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__key_container__key}>Username:</Typography>
                                    </Box>
                                    <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__value} sx={{ textTransform: 'capitalize' }}>{user?.username || "N/A"}</Typography>
                                </Box>
                            </Box>
                            <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section}>
                                <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content}>
                                    <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content__key_container}>
                                        <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__key_container__key}>Company:</Typography>
                                    </Box>
                                    <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__value}>Black Lion</Typography>
                                </Box>
                                <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content}>
                                    <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content__key_container}>
                                        <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__key_container__key}>Website:</Typography>
                                    </Box>
                                    <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__value}>www.blacklionapp.com</Typography>
                                </Box>
                                <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content}>
                                    <Box variant="div" component="div" className={classess.page__banner__details__detail_contain__section__content__key_container}>
                                        <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__key_container__key}>Country:</Typography>
                                    </Box>
                                    <Typography variant="subtitle1" gutterBottom className={classess.page__banner__details__detail_contain__section__content__value}>London</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <ArtistList selectedView={selectedView} />
            </Box >
        </Container>
    )
}

export default Home;