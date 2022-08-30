import React, { useEffect, useState } from 'react'
import classess from "./style.module.scss";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import searchicon from "../../../../assets/icons/fancy_search.svg";
import YTSearch from "youtube-api-search";
import PlayVideoDialog from '../../../play-video-dialog/playVideoDialog';

const VerifyList = ({ artist }) => {
    const [ytVideos, setYtVideos] = useState();
    const [open, setOpen] = useState(false);
    const [getDialogData, setDialogData] = useState(false);

    const openDialog = (row) => {
        setDialogData(row)
        setOpen(true);
    };

    const handleClose = () => {
        setDialogData(null);
        setOpen(false);
    };

    const getYouTubeVidios = (search) => {
        YTSearch({ key: "AIzaSyBgWEQ_Fbc4NW36c_Re03wf9FSw_MH5P44", term: search }, (videos) => {
            setYtVideos(videos);
        });
    }

    useEffect(() => {
        getYouTubeVidios(artist?.name);
    }, [])

    return (
        <Box varient="div" component="div" className={classess.page}>
            <Box varient="div" component="div" className={classess.page__searchTracks}>
                <Typography varient='h3' sx={{ fontSize: '22px' }}>
                    SEARCH TRACK BY KEYWORD
                </Typography>
                <Box varient="div" component="div" className={classess.page__searchTracks__search_container}>
                    <input
                        className={
                            classess.page__searchTracks__search_container__search_input
                        }
                        name="search"
                        placeholder="Search"
                        onInput={(event) => getYouTubeVidios(event.target.value)}
                        type="text"
                    />
                    <img
                        src={searchicon}
                        alt="search icon"
                        className={
                            classess.page__searchTracks__search_container__search_icon
                        }
                    />
                </Box>
                <Typography varient='h3' sx={{ fontSize: '22px', marginTop: '32px' }}>
                    VERIFY STREAMING DATA
                </Typography>
                <Typography varient='p' sx={{ fontSize: '14px' }}>
                    How much you own of your tracks directly impacts your funding level. Use the sliders to adjust your share of master ownership for your top tracks. Note: it may take 3-6 weeks for recent releases to register.
                </Typography>
                <Box varien="div" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button sx={{ backgroundColor: '#36A1FF', borderRadius: '20px', paddingLeft: '36px', paddingRight: '36px', color: '#F5FBFF', marginRight: '15px' }}>Save</Button>
                    <Button sx={{ backgroundColor: '#EC1086', borderRadius: '20px', paddingLeft: '36px', paddingRight: '36px', color: '#F5FBFF', marginLeft: '15px' }}>Confirm</Button>
                </Box>
            </Box>
            <Box varient="div" component="div" className={classess.page__listYT_container}>
                {ytVideos && ytVideos.length ? (
                    <ul varient="div" component="div" className={classess.page__listYT_container__list}>
                        {
                            ytVideos.map((yt, idx) => (
                                <li key={idx} className={classess.page__listYT_container__list__item}>
                                    <img className={classess.page__listYT_container__list__item__img} src={yt?.snippet?.thumbnails?.default?.url} alt="" onClick={() => openDialog(yt)} />
                                    <Box varient="div" component="div" className={classess.page__listYT_container__list__item__content}>
                                        <Typography className={classess.page__listYT_container__list__item__content__title} title={yt?.snippet?.description}>{yt?.snippet?.description}</Typography>
                                        <Typography className={classess.page__listYT_container__list__item__content__description} title={`https://www.youtube.com/${yt?.id?.videoId}`}>https://www.youtube.com/{yt?.id?.videoId}</Typography>
                                    </Box>
                                </li>
                            ))
                        }
                    </ul>
                ) : null}
            </Box>
            <PlayVideoDialog open={open} handleClose={handleClose} video={getDialogData} />
        </Box >
    )
}

export default VerifyList;