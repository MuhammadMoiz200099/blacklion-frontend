import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtistById } from "../../../redux/slice/artist";
import LinearProgressWithLabel from "../../../components/linear-progress-bar/linear-progress-bar";
import { artistTopTracks, getSimilarArtist } from "../../../api/spotify.api";
import AddMyArtist from "../../../components/add-my-artist-popup/add-my-artist"

const ViewArtist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const artist = useSelector((state) => state.artist.artist)
  const [tracks, settracks] = useState([])
  const [similarArtist, setSimilarArtist] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (id) {
      initUIData();
    }

  }, [])

  const mapperSimiilarArtist = (artist) => ({
    id: artist?.id,
    name: artist?.name,
    popularity: artist?.popularity,
    image: artist?.images[2].url,
    followers: artist?.followers.total
  })

  const getSimilarArtistForCurrentArtist = (id) => {
    getSimilarArtist(id).then((res) => {
      setSimilarArtist([...res.artists.map(mapperSimiilarArtist)])
    }).catch((err) => {
      console.log("Err: ", err);
    })
  }

  const initUIData = () => {
    dispatch(
      getArtistById({
        id
      })
    )
  }
  const mapTracks = (tracks) => ({
    id: tracks.id,
    name: tracks.name,
    image: tracks.album.images[2].url,
    popularity: tracks.popularity
  })

  useEffect(() => {
    if (artist && Object.keys(artist).length) {
      getTopTracks(artist?.spotify_id);
      getSimilarArtistForCurrentArtist(artist?.spotify_id);
    }
  }, [artist])

  const getTopTracks = (spoid) => {
    artistTopTracks(spoid).then((res) => {
      settracks([...res.tracks.map(mapTracks)])
    }).catch((err) => {
      console.log("ERR: ", err);
    })
  }

  return (
    <Container maxWidth="xl">
      <Box varient="div" component="div" className={classess.page}>

        <Box
          varient="div"
          component="div"
          sx={{ width: 385, height: 718, p: { xs: 2, sm: 3, lg: 5 }, mt: 3 }}
          className={classess.page__fieldsContainer}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__fieldsContainer__image_container}
          // sx={{ flexDirection: { xs: 'column', sm: "row" } }}
          >
            <Box
              variant="div"
              component="div"
              className={classess.page__fieldsContainer__innerdetails}
            >

              <Box
                variant="div"
                component="div"
                className={classess.page__fieldsContainer__imagleCircle}
              >
                <Box
                  variant="div"
                  component="div"
                  className={classess.page__fieldsContainer__imagleCircle__inner_cirlcle}
                >


                  <Avatar
                    src={artist?.avatar}
                    alt={artist?.name}
                    sx={{ height: 160, width: 160 }}
                  />
                </Box>
              </Box>



            </Box>
            <Typography variant="h3" gutterBottom component="div"
              className={classess.page__fieldsContainer__aritisName}>
              {artist?.name}
            </Typography>

            {artist?.description && (
              <Typography variant="p" component="div"
                title={artist?.description}
                className={classess.page__fieldsContainer__artistsDetails}
              >
                {artist?.description || ""}
              </Typography>

            )}
            <Button
              onClick={handleOpen}
              variant="contained"
              className={classess.page__fieldsContainer__addArtistTomyArtist}>Add Artist to my Artist</Button>
            <Button
              onClick={() => navigate(`/blig/view-funding-dashboard/${id}`)}
              variant="contained"
              className={classess.page__fieldsContainer__ViewFundingBtn}>View Funding Dashboard</Button>
          </Box>
        </Box>
        <Box
          variant="div"
          component="div"
          className={classess.page__AritistInfoPlusTopTracksContainers}
        >
          <Box
            variant="div"
            component="div"
            className={classess.page__ArtistsInfoContainer}
          >
            <Box
              variant="div"
              component="div"
              className={classess.page__ArtistsInfoContainer__col1}
            >
              <Typography variant="p">
                Basic Information
              </Typography>
              <Button
                onClick={() => navigate(`/blig/edit-artist/${artist?._id}`)}
                variant="contained"
                className={classess.page__ArtistsInfoContainer__col1__editArtistBtn}
              >Edit Artist</Button>
            </Box>
            <Box
              variant="div"
              component="div"
              className={classess.page__ArtistsInfoContainer__col1}
            >
              <Box
                variant="div"
                component="div"
                className={classess.page__ArtistsInfoContainer__col1__Artistname}
              >
                <Typography variant="p"
                  className={classess.page__ArtistsInfoContainer__col1__Artistname__name}
                >
                  Name:
                </Typography>
                <Typography variant="p"
                  className={classess.page__ArtistsInfoContainer__col1__Artistname__Gettingname}
                >
                  {artist?.name}
                </Typography>

              </Box>
              <Box
                variant="div"
                component="div"
                className={classess.page__ArtistsInfoContainer__col1__Artistname}
              >
                <Typography variant="p"
                  className={classess.page__ArtistsInfoContainer__col1__Artistname__name}
                >
                  Email:
                </Typography>
                <Typography variant="p"
                  className={classess.page__ArtistsInfoContainer__col1__Artistname__Gettingname}
                >

                  {artist?.email}
                </Typography>

              </Box>
            </Box>
            <Box
              variant="div"
              component="div"
              className={classess.page__ArtistsInfoContainer__col1}
            >
              <Box
                variant="div"
                component="div"
                className={classess.page__ArtistsInfoContainer__col1__Artistname}
              >
                <Typography variant="p"
                  className={classess.page__ArtistsInfoContainer__col1__Artistname__name}
                >
                  Spotify ID:
                </Typography>
                <Typography variant="p"
                  className={classess.page__ArtistsInfoContainer__col1__Artistname__Gettingname}
                >
                  {artist?.spotify_id}
                </Typography>

              </Box>
              <Box
                variant="div"
                component="div"
                className={classess.page__ArtistsInfoContainer__col1__ArtistTrack}
              >
                <Typography variant="p"
                  className={classess.page__ArtistsInfoContainer__col1__Artistname__name}
                >
                  Total Tracks:
                </Typography>
                <Typography variant="p"
                  className={classess.page__ArtistsInfoContainer__col1__Artistname__Gettingname}
                >

                  {tracks.length}
                </Typography>

              </Box>



            </Box>
          </Box>

          <Box
            variant="div"
            component="div"
            className={classess.page__ArtistsInfoContainer}
          >
            <Box
              variant="div"
              component="div"
              className={classess.page__ArtistsInfoContainer__col2}
            >
              <Typography variant="p">
                Top Tracks
              </Typography>
              <Button
                variant="text"
                className={classess.page__ArtistsInfoContainer__col2__viewAllbtn}
              >View All</Button>
            </Box>
            {tracks.map((track, idx) => (
              <Box key={idx}
                variant="div"
                component="div"
                className={classess.page__ArtistsInfoContainer__col2}
              >
                <Avatar
                  src={track.image}
                  alt={artist?.name}
                  sx={{ height: 50, width: 50, }}
                />

                <Typography variant="p" sx={{ width: '300px' }}>
                  {track.name}
                </Typography>


                <Box varient="div" component="div" sx={{ width: 140 }}>
                  <LinearProgressWithLabel value={0} />
                </Box>
              </Box>
            ))}


          </Box>

        </Box>
        <Box
          variant="div"
          component="div"
          className={classess.page__similarArtist}
        >
          <Box
            variant="div"
            component="div"
            className={classess.page__similarArtist__title}
          >
            <Typography
              variant="p"
            >
              Similar Artists
            </Typography>

          </Box>
          {similarArtist && similarArtist.length ? (
            <ul className={classess.page__similarArtist__list}>
              {similarArtist.map((artist, idx) => (
                <li key={idx} className={classess.page__similarArtist__list__items}>
                  <Avatar
                    src={artist?.image}
                    alt={artist?.name}
                    sx={{ height: 50, width: 50, }}
                  />
                  <Box
                    variant="div"
                    component="div"
                    className={classess.page__similarArtist__list__items__details}
                  >
                    <Typography variant="p" className={classess.page__similarArtist__list__items__details__name}>
                      {artist?.name}
                    </Typography>
                    <Typography variant="p" className={classess.page__similarArtist__list__items__details__subtext}>
                      {artist?.name.replace(/\s+/g, '') + "@spotify.com"}
                    </Typography>
                  </Box>
                </li>
              ))}
            </ul>
          ) : null}
        </Box>
      </Box>
      <AddMyArtist open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </Container>
  );
};

export default ViewArtist;
