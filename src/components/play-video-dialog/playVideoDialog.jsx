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

const PlayVideoDialog = ({ open, handleClose, video }) => {
    const styles = dialogBodyUseStyles();
    const videoId = video?.id?.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    return (
        <>
            {video && Object.keys(video).length ? (<Dialog
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
                    </Box>
                </DialogTitle>
                <DialogContent >
                    {url ? (
                        <iframe src={url} style={{ width: 600, height: 600, border: 'none' }} />
                    ) : (
                        <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: 'center', color: 'white', px: 10, py: 10 }}>
                            Video is not avaliable, please check it on youtube
                            <Link href={`https://www.youtube.com/watch?v=${video?.id.videoId}`} target="_blank" title="Open in spotify">
                                <FaLink fontSize={18} color="#d6d6d6" cursor="pointer" style={{ marginLeft: 10 }} />
                            </Link>
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>) : null}
        </>
    )
}

export default PlayVideoDialog;