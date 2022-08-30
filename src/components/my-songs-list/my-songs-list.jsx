import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import artist, { getArtist } from "../../redux/slice/artist";
import classess from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { FaPlay } from "react-icons/fa";
import { getTopSongOfTheWeek } from "../../api/spotify.api";
import { handleDatesToDate } from "../../utils/helper";
import { muiTableCellUseStyles } from "../../custom-mui-style/custom-mui-styles";
import PlaySongDialog from "../play-song-dialog/play-song-dialog";

const MySongsList = () => {
    const dispatch = useDispatch();
    const [topTracks, setTopTracks] = useState([]);
    const cellUseStyles = muiTableCellUseStyles();
    const [open, setOpen] = useState(false);
    const [getDialogData, setDialogData] = useState(false);

    const handleClickOpen = (row) => {
        const data = {
            link: row?.track?.preview_url,
            name: row?.track?.name,
            image: row?.track?.album?.images[0].url,
            album: row?.track?.album?.name,
            spotify_url: row?.track?.external_urls?.spotify,
            artist: row?.track?.artists?.map((e) => e.name).toString(),
            date: row?.added_at,
        } 
        setDialogData(data)
        setOpen(true);
    };

    const handleClose = () => {
        setDialogData(null);
        setOpen(false);
    };

    const getSongs = () => {
        getTopSongOfTheWeek('4joqw3e0n9gDNVDhgKapCU').then((res) => {
            const items = res.tracks.items;
            setTopTracks(items);
        }).catch((err) => {
            console.log("Err: ", err);
        })
    }

    const initUIData = () => {
        dispatch(getArtist());
    };

    useEffect(() => {
        initUIData();
        getSongs();
    }, []);

    return (
        <Box varient="div" component="div" className={classess.page}>
            <Box varient="div" component="div" className={classess.page__header}>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    className={classess.page__header__table_title}
                >
                    Top Songs
                </Typography>
            </Box>
            {topTracks && topTracks.length ? (
                <TableContainer component={Paper} className={classess.page__table}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classess.page__table__col}># Title</TableCell>
                                <TableCell sx={{ width: 300, textAlign: 'center' }} className={classess.page__table__col}>Album</TableCell>
                                <TableCell sx={{ width: 150, textAlign: 'center' }} className={classess.page__table__col}>
                                    Date Added
                                </TableCell>
                                <TableCell sx={{ width: 150, textAlign: 'center' }} className={classess.page__table__col}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {topTracks.map((row, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    className={cellUseStyles.row}
                                >
                                    <TableCell className={classess.page__table__row}>
                                        <Box varient="div" component="div" sx={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center', gap: 3 }}>
                                            <Avatar
                                                src={row?.track?.album?.images[2].url}
                                            ></Avatar>
                                            <Typography className={classess.page__table__row__text_overflow}>{row?.track?.name || "N/A"}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell className={classess.page__table__row}>
                                        {row?.track?.album?.name || "N/A"}
                                    </TableCell>
                                    <TableCell sx={{ width: 150, textAlign: 'center' }} className={classess.page__table__row}>
                                        {handleDatesToDate(row?.added_at)}
                                    </TableCell>
                                    <TableCell className={classess.page__table__row}>
                                        <Stack sx={{ width: 150 }} spacing={4} direction="row" justifyContent="center" alignItems="center">
                                            <FaPlay title="Play the song" cursor="pointer" onClick={() => handleClickOpen(row)} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box varient="div" component="div" sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom component="div" sx={{ color: '#d6d6d6' }}>Waiting for the Response...</Typography>
                </Box>
            )}
            <PlaySongDialog dialogData={getDialogData} open={open} handleClose={handleClose} />
        </Box>
    );
};

export default MySongsList;
