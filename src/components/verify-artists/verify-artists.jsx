import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtist } from '../../redux/slice/artist';
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinearProgressWithLabel from "../../components/linear-progress-bar/linear-progress-bar";
import { artistTopTracks } from "../../api/spotify.api";
import { muiTableCellUseStyles } from '../../custom-mui-style/custom-mui-styles';



export default function BasicTable() {

    const dispatch = useDispatch();
    const artist = useSelector((state) => state.artist.artist)
    const [selected, setSelected] = useState([]);
    const [tracks, settracks] = useState([]);
    const cellUseStyles = muiTableCellUseStyles();

    useEffect(() => {
        dispatch(getArtist())
    }, [])


    const handleSelectAllClick = (event) => {
        console.log(event.target.checked);
        if (event.target.checked) {
            const newSelected = tracks.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    
    const handleSingleSelect = (id) => {
        if(isSelected(id)) {
            const filter = selected.filter((ids) => ids !== id);
            setSelected(filter);
            console.log('chal')
        } else {
            console.log('chal1', id)
            setSelected((prev) => [...prev, id]);
        }
    }

    useEffect(() => {
        console.log(selected);
    }, [selected])

    const isSelected = (id) => selected.includes(id);


    const mapTracks = (tracks)=>({
        id: tracks.id,
        name:tracks.name,
        image:tracks.album.images[2].url,
        popularity:tracks.popularity
      })
    const getTopTracks = (spoid) => {
        artistTopTracks(spoid).then((res) => {
        //   console.log(res.tracks);
          settracks([...res.tracks.map(mapTracks)])
    
        }).catch((err) => {
          console.log("ERR: ", err);
        })
      }
      useEffect(() => {
        if(artist && Object.keys(artist).length) {
          getTopTracks(artist?.spotify_id)
        }
      }, [artist])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', background: "#0A1230" }}>
            {artist && Object.keys(artist).length ? (
                <TableContainer sx={{ maxHeight: 380 }} className={classess.table}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" className={classess.table__col}>
                                    <Checkbox
                                        sx={{color: '#FFFFFF'}}
                                        indeterminate={selected.length > 0 && selected.length < tracks.length}
                                        checked={tracks.length > 0 && selected.length === tracks.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell className={classess.table__col} sx={{ maxWidth: 50 }}>#</TableCell>
                                <TableCell className={classess.table__col}>Top Tracks</TableCell>
                                <TableCell className={classess.table__col}>Share of Streaming Income</TableCell>
                                <TableCell className={classess.table__col}>Actions</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tracks.map((row, index) => {
                                const isItemSelected = isSelected(row?.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className={cellUseStyles.row}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                sx={{color: '#FFFFFF'}}
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                onClick={() => handleSingleSelect(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell className={classess.table__row} sx={{ maxWidth: 50 }}>
                                            <Avatar src={row.image} sx={{ width: '50px', height: '50px' }} />
                                        </TableCell>
                                        <TableCell className={classess.table__row}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell className={classess.table__row}>
                                            
                                                 <LinearProgressWithLabel value={0} />
                                        </TableCell>
                                        <TableCell className={classess.table__row}>
                                            <EditIcon />
                                            <DeleteIcon />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box varient="div" component="div" sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom component="div" sx={{ color: '#d6d6d6' }}>Waiting for the Response...</Typography>
                </Box>
            )}
        </Paper>

    );
}
