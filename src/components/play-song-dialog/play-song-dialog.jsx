import React, { useEffect } from 'react'
import classess from "./style.module.scss";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Draggable from 'react-draggable';
import { dialogBodyUseStyles } from '../../custom-mui-style/custom-mui-styles';
import { AiOutlineClose } from "react-icons/ai";
import { FaLink } from "react-icons/fa";

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}


const PlaySongDialog = ({ dialogData, open, handleClose }) => {
    const styles = dialogBodyUseStyles();
    return (
        <>
            {dialogData && Object.keys(dialogData).length ? (<Dialog
                open={open}
                onClose={(_, reason) => {
                    if (reason !== "backdropClick") {
                        handleClose();
                    }
                }}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                className={styles.dialog}
            >
                <DialogTitle style={{ cursor: 'move' }} className={classess.header_container} id="draggable-dialog-title">
                    <Box className={classess.header_container__header}>
                        <AiOutlineClose fontSize={26} color="white" fontWeight="bold" className={classess.header_container__header__close_button} onClick={handleClose} />
                        <Box varient="div" component="div" className={classess.header_container__header__title_content}>
                            <Avatar className={classess.header_container__header__title_content__avatar} src={dialogData?.image} alt={dialogData?.name} />
                            <Box varient="div" component="div">
                                <Typography variant="h4" gutterBottom component="div" className={classess.header_container__header__title_content__title}>
                                    {dialogData?.name}
                                    <Link href={dialogData?.spotify_url} target="_blank" title="Open in spotify">
                                        <FaLink fontSize={18} color="#d6d6d6" cursor="pointer" style={{ marginLeft: 10 }} />
                                    </Link>
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom className={classess.header_container__header__title_content__subsidaries}>Album: {dialogData?.album}</Typography>
                                <Typography variant="overline" display="block" gutterBottom className={classess.header_container__header__title_content__subsidaries}>Artist: {dialogData?.artist}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {dialogData?.link ? (
                        <iframe src={dialogData?.link} style={{ width: 500, height: 300, border: 'none' }} />
                    ) : (
                        <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'center', color: 'white', px: 10, py: 10 }}>
                            Song not avaiable for Free, Check it on Spotify
                            <Link href={dialogData?.spotify_url} target="_blank" title="Open in spotify">
                                <FaLink fontSize={18} color="#d6d6d6" cursor="pointer" style={{ marginLeft: 10 }} />
                            </Link>
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>) : null}
        </>
    )
}

export default PlaySongDialog;