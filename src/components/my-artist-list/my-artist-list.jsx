import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteArtist, getArtist } from "../../redux/slice/artist";
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
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { muiTableCellUseStyles } from "../../custom-mui-style/custom-mui-styles";

const MyArtistList = ({ selectedView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const artist = useSelector((state) => state.artist.artists);
  const [artistList, setArtistList] = useState([]);
  const [activeSort, setActiveSort] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sliceContent, setSliceContent] = useState(6);
  const cellUseStyles = muiTableCellUseStyles();

  const initUIData = () => {
    dispatch(getArtist());
  };

  const sortTable = () => {
    setActiveSort(true);
    let currentSortBy = "name";
    let currentSortOrder = sortOrder === "asc" ? "desc" : "asc";
    if (artistList && artistList.length) {
      const records = [...artistList];
      const compareFunction = (i, j) => {
        if (i[currentSortBy] < j[currentSortBy]) {
          return currentSortOrder === "asc" ? -1 : 1;
        } else {
          if (i[currentSortBy] > j[currentSortBy]) {
            return currentSortOrder === "asc" ? 1 : -1;
          } else {
            return 0;
          }
        }
      };
      let sortedItems = records.sort(compareFunction);
      setArtistList(sortedItems);
      setSortOrder(currentSortOrder);
    }
  };

  const deleteArtistByID = (id) => {
    dispatch(
      deleteArtist({
        id
      })
    )
    initUIData();
  }

  const loadMoreArtist = () => {
    let checkExceeding = sliceContent + 3;
    if (checkExceeding <= artist.length) {
      setSliceContent(checkExceeding);
    } else {
      let diff = checkExceeding - artist.length;
      checkExceeding -= diff;
      setSliceContent(checkExceeding);
    }
  }

  useEffect(() => {
    initUIData();
  }, []);

  useEffect(() => {
    if (artist && artist.length) {
      setArtistList(artist);
    }
  }, [artist]);

  useEffect(() => {
    if (selectedView === 'list') {
      setSliceContent(6);
    }
  }, [selectedView]);


  const getEmail = (email, name) => {
    if (email) {
      return email
    }
    const newName = name.replace(/\s+/, '');
    return `${newName}@spotify.com`;
  }

  return (
    <Box varient="div" component="div" className={classess.page} sx={{ background: selectedView === 'list' ? '#0A1230' : 'transparent' }}>
      <Box varient="div" component="div" className={classess.page__header}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          className={classess.page__header__table_title}
        >
          My Artist List
        </Typography>
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            className={classess.page__header__btn_filter}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            className={classess.page__header__add_new}
            onClick={() => navigate('/blig/add-artist')}
          >
            + Add New
          </Button>
        </Stack>
      </Box>
      {artistList && artistList.length ? (
        <>
          {selectedView === 'list' && (
            <TableContainer component={Paper} className={classess.page__table}>
              <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classess.page__table__col}>ID</TableCell>
                    <TableCell sortDirection={sortOrder} className={classess.page__table__col} onClick={sortTable}>
                      <Box variant="div" component="div" className={classess.page__table__col__sortable}>

                        <span>Name</span>
                        {activeSort ? (
                          <>
                            {sortOrder === "asc" && <BsArrowUpShort color="#CECECE" size={28} />}
                            {sortOrder === "desc" && <BsArrowDownShort color="#CECECE" size={28} />}
                          </>
                        ) : null}
                      </Box>
                    </TableCell>
                    <TableCell className={classess.page__table__col}>
                      Email
                    </TableCell>
                    <TableCell className={classess.page__table__col}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {artistList.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className={cellUseStyles.row}
                    >
                      <TableCell className={classess.page__table__row}>
                        {row?._id}
                      </TableCell>
                      <TableCell
                        className={classess.page__table__row}
                      >
                        <Box varient="div" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Box
                            variant="div"
                            component="div"
                            className={classess.page__table__row__name}
                          >
                            <Avatar src={row?.avatar} alt={row?.name} />
                            <div className={classess.page__table__row__name__getname}>{row?.name}</div>

                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell className={classess.page__table__row}>
                        {getEmail(row?.email, row?.name)}
                      </TableCell>
                      <TableCell className={classess.page__table__row}>
                        <Stack spacing={2} direction="row" justifyContent="center">
                          <VisibilityIcon
                            className={classess.page__table__row__icon}
                            onClick={() => navigate(`/blig/view-artist/${row?._id}`)}
                          />
                          <EditIcon className={classess.page__table__row__icon} onClick={() => navigate(`/blig/edit-artist/${row?._id}`)} />
                          <DeleteIcon className={classess.page__table__row__icon} onClick={() => deleteArtistByID(row?._id)} />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedView === 'grid' && (
            <Box className={classess.page__main_cards_container}>
              <Box varient="div" component="div" className={classess.page__main_cards_container__cards_container}>
                {artistList.slice(0, sliceContent).map((artist, idx) => (
                  <Box key={idx} varient="div" component="div" className={classess.page__main_cards_container__cards_container__card}>
                    <Box varient="div" component="div" className={classess.page__main_cards_container__cards_container__card__main_container}>
                      <Avatar className={classess.page__main_cards_container__cards_container__card__main_container__image} src={artist?.avatar} alt={artist?.name} />
                      <Typography className={classess.page__main_cards_container__cards_container__card__main_container__title}>{artist?.name}</Typography>
                      <Typography className={classess.page__main_cards_container__cards_container__card__main_container__subtitle}>{getEmail(artist?.email, artist?.name)}</Typography>
                    </Box>
                    <Box varient="div" component="div" className={classess.page__main_cards_container__cards_container__card__actions}>
                      <Stack spacing={2} direction="row" justifyContent="center">
                        <VisibilityIcon
                          className={classess.page__main_cards_container__cards_container__card__actions__icon}
                          onClick={() => navigate(`/blig/view-artist/${artist?._id}`)}
                        />
                        <EditIcon className={classess.page__main_cards_container__cards_container__card__actions__icon} onClick={() => navigate(`/blig/edit-artist/${artist?._id}`)} />
                        <DeleteIcon className={classess.page__main_cards_container__cards_container__card__actions__icon} onClick={() => deleteArtistByID(artist?._id)} />
                      </Stack>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box className={classess.page__main_cards_container__load_more_container}>
                {sliceContent < artist.length && (
                  <button className={classess.page__main_cards_container__load_more_container__load_more_button} onClick={loadMoreArtist}>Load More</button>
                )}
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Box varient="div" component="div" sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ color: '#d6d6d6' }}>Waiting for the Response...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MyArtistList;
