import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtistById, updateArtist, updateArtistWithProfile } from "../../../redux/slice/artist";
import { Avatar } from "@mui/material";
import editIcon from "../../../assets/icons/edit.svg";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton"

const EditArtist = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const artist = useSelector((state) => state.artist.artist);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [cityState, setCityState] = useState();
  const [country, setCountry] = useState();
  const [avatar, setAvatar] = useState();
  const [image, setImage] = useState();
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      initUIData();
    }
  }, []);

  useEffect(() => {
    if (artist) {
      setName(artist?.name);
      setTelephone(artist?.telephone);
      setCityState(artist?.city + ", " + artist?.state);
      setCountry(artist?.country);
      setAvatar(artist?.avatar);
      setImage(artist?.avatar);
    }
  }, [artist]);

  const initUIData = () => {
    dispatch(
      getArtistById({
        id,
      })
    );
  };

  const handleProfileChange = (event) => {
    setAvatar(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]))
    setIsProfileChanged(true);
    event.target.files = null;
  };

  const handleOnSubmit = () => {
    setIsLoading(true);
    const { city, state } = handleCityState(cityState);

    if (!isProfileChanged) {
      const payload = {
        name,
        telephone,
        email,
        city,
        state,
        country,
        spotify_id: artist?.spotify_id,
        avatar,
      };

      dispatch(
        updateArtist({
          id: artist?._id,
          data: payload,
        })
      );
    } else {
      let payload = new FormData();

      payload.append("file", avatar);
      payload.append("name", name);
      payload.append("email", email);
      payload.append("telephone", telephone);
      payload.append("city", city);
      payload.append("state", state);
      payload.append("country", country);
      payload.append("spotify_id", artist?.spotify_id);

      dispatch(
        updateArtistWithProfile({
          id: artist?._id,
          data: payload,
        })
      );
    }
    setTimeout(() => {
      setIsLoading(false);
      navigate("/blig/home");
    }, 1000);
  };

  const handleCityState = () => {
    const splitted = cityState.split(',');
    let city, state;
    if(splitted[0]) {
      city = splitted[0].trim();
    }
    if(splitted[1]) {
      state = splitted[1].trim();
    }
    return { city, state };
  }

  

  return (
    <Container maxWidth="xl">
      <Box varient="div" component="div" className={classess.page}>
        <Box varient="div" component="div" className={classess.page__title_bar}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            className={classess.page__title_bar__title}
          >
            Edit Artist Details
          </Typography>
        </Box>
        <Box
          varient="div"
          component="div"
          sx={{ p: { xs: 2, sm: 3, lg: 5 }, mt: 3 }}
          className={classess.page__fieldsContainer}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__fieldsContainer__image_container}
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Box
              varient="div"
              component="div"
              className={
                classess.page__fieldsContainer__image_container__avatar_container
              }
            >
              <Avatar
                src={image}
                alt={name}
                sx={{ height: 150, width: 150 }}
              />
              <div
                className={
                  classess.page__fieldsContainer__image_container__avatar_container__icon
                }
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleProfileChange}
                  />
                  <img src={editIcon} alt="edit Icon" />
                </IconButton>
              </div>
            </Box>
            <Typography variant="h3" gutterBottom component="div">
              {artist?.name}
            </Typography>
          </Box>
          <form
            className={classess.page__fieldsContainer__form}
            autoComplete="off"
          >
            <Stack
              direction="row"
              sx={{
                gap: { xs: 3, sm: 8, lg: 15 },
                flexWrap: { xs: "wrap", sm: "nowrap" },
              }}
            >
              <Box
                varient="div" component="div"
                className={classess.page__fieldsContainer__form__formfield}
                sx={{ width: "100%" }}
              >
                <label
                  className={
                    classess.page__fieldsContainer__form__formfield__label
                  }
                >
                  Artist Name *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={name || "N/A"}
                  name="name"
                  placeholder="Enter Artist Name"
                  onInput={(event) => setName(event.target.value)}
                  type="text"
                  required
                />
              </Box>
              <Box
                varient="div" component="div"
                className={classess.page__fieldsContainer__form__formfield}
                sx={{ width: "100%" }}
              >
                <label
                  className={
                    classess.page__fieldsContainer__form__formfield__label
                  }
                >
                  Phone *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={telephone || "N/A"}
                  name="telephone"
                  placeholder="Enter Number"
                  onInput={(event) => setTelephone(event.target.value)}
                  type="text"
                  required
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                gap: { xs: 3, sm: 8, lg: 15 },
                flexWrap: { xs: "wrap", sm: "nowrap" },
              }}
            >
              <Box
                varient="div" component="div"
                className={classess.page__fieldsContainer__form__formfield}
                sx={{ width: "100%" }}
              >
                <label
                  className={
                    classess.page__fieldsContainer__form__formfield__label
                  }
                >
                  E-mail Address *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={artist?.email || "N/A"}
                  name="email"
                  placeholder="Enter Email Address"
                  onInput={(event) => setEmail(event.target.value)}
                  type="email"
                />
              </Box>
              <Box
                varient="div" component="div"
                className={classess.page__fieldsContainer__form__formfield}
                sx={{ width: "100%" }}
              >
                <label
                  className={
                    classess.page__fieldsContainer__form__formfield__label
                  }
                >
                  City / State
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={cityState || "N/A"}
                  name="city"
                  onInput={(event) => setCityState(event.target.value)}
                  placeholder="Enter City"
                  type="text"
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                gap: { xs: 3, sm: 8, lg: 15 },
                flexWrap: { xs: "wrap", sm: "nowrap" },
              }}
            >
              <Box
                varient="div" component="div"
                className={classess.page__fieldsContainer__form__formfield}
                sx={{ width: "100%" }}
              >
                <label
                  className={
                    classess.page__fieldsContainer__form__formfield__label
                  }
                >
                  Country
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={country || "N/A"}
                  name="country"
                  onInput={(event) => setCountry(event.target.value)}
                  placeholder="Enter Country"
                  type="text"
                />
              </Box>
              <Box
                varient="div" component="div"
                className={classess.page__fieldsContainer__form__formfield}
                sx={{ width: "100%" }}
              >
                <label
                  className={
                    classess.page__fieldsContainer__form__formfield__label
                  }
                >
                  Spotify ID *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={artist?.spotify_id || "N/A"}
                  name="spotify_id"
                  placeholder="Enter Spotify Id"
                  readOnly
                  disabled
                />
              </Box>
            </Stack>
            <Box
              varient="div" component="div"
              className={classess.page__fieldsContainer__form__action}
            >
              <LoadingButton
                type="button"
                className={
                  classess.page__fieldsContainer__form__action__submit_btn
                }
                variant="contained"
                loading={isLoading}
                sx={{ width: { xs: "100%", sm: "100%", lg: "20%" } }}
                onClick={handleOnSubmit}
              >
                Update Artist
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default EditArtist;
