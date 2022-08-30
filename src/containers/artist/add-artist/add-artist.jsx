import React, { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import { addArtist, addArtistWithImage } from "../../../redux/slice/artist";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton"
import { searchArtist } from "../../../api/spotify.api";
import SearchAutcomplete from "../../../components/search-autcomplete/search-autcomplete";
import { BsImages } from "react-icons/bs";
import Avatar from "@mui/material/Avatar";

const AddArtist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cityState, setCityState] = useState("");
  const [country, setCountry] = useState("");
  const [spotify_id, setSpotify_id] = useState("");
  const [search, setSearch] = useState("");
  const [searchedArtistList, setSearchedArtistList] = useState([]);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    if (!image) {
      toast.error("Please Upload an Image.");
      return;
    }
    const { city, state } = handleCityState(cityState);

    if (isImageUploaded) {

      let payload = new FormData();

      payload.append("file", avatar);
      payload.append("name", name);
      payload.append("email", email);
      payload.append("telephone", telephone);
      if(cityState) {
        payload.append("city", city.value);
        payload.append("state", state.value);
      }
      payload.append("country", country);
      payload.append("spotify_id", spotify_id);

      dispatch(
        addArtistWithImage({
          data: payload
        })
      )

    } else {
      const payload = {
        name,
        email,
        telephone,
        country,
        spotify_id,
        avatar: image
      }
      if(cityState) {
        payload.city = city;
        payload.state = state;
      }

      console.log(payload);
      dispatch(
        addArtist({
          data: payload
        })
      )
    }
    setTimeout(() => {
      emptyFields();
      setIsLoading(false);
      navigate('/blig/home');
    }, 500);
  };

  const handleCityState = (str) => {
    let city, state;
    if(str) {
      const splitted = str.split(',');
      city = splitted[0].trim()
      state = splitted[1].trim()
    }
    return { city, state }
  }

  const emptyFields = () => {
    setName('');
    setEmail('');
    setTelephone('');
    setCityState('');
    setCountry('');
    setSpotify_id('');
    setSearch('');
    setImage('');
    setSearchedArtistList('');
    setIsImageUploaded(false);
  }

  const handleAvatarChooseFile = (event) => {
    if (event.target.files && event.target.files.length) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setAvatar(event.target.files[0]);
      setIsImageUploaded(true);
      event.target.files = null;
    }
  };

  const handleAvatarUploads = (event) => {
    if (event.target.files && event.target.files.length) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setAvatar(event.target.files[0]);
      setIsImageUploaded(true);
      event.target.files = null;
    }
  };

  const mapSearchArtist = (item) => {
    let obj = {}

    obj.id = item?.id;
    obj.name = item?.name;

    if (item?.images && item?.images.length) {
      obj.image = item?.images[0].url
    } else {
      obj.image = ""
    }

    return obj;
  }

  const handleSearch = (event) => {
    const toSearch = event.target.value;
    setSearch(toSearch);
    if (toSearch.length >= 3) {
      searchArtist(toSearch).then((res) => {
        const artist = res.artists.items;
        setSearchedArtistList([...artist.map(mapSearchArtist)])
      }).catch((err) => {
        console.log("Err: ", err);
      })
    } else {
      setSearchedArtistList([])
    }
  }

  const handleSearchItem = (artist) => {
    setSearch("")
    setSearchedArtistList([])
    setImage(artist.image);
    setName(artist.name);
    setSpotify_id(artist.id);
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
            Add New Artist
          </Typography>
        </Box>

        <Box
          varient="div"
          component="div"
          sx={{ p: { xs: 2, sm: 3, lg: 5 }, mt: 3 }}
          className={classess.page__fieldsContainer}
        >

          <Stack
            direction="row"
            sx={{
              gap: { xs: 3, sm: 8, lg: 15 },
              flexWrap: { xs: "wrap", sm: "nowrap" },
              marginBottom: 5
            }}
          >
            <SearchAutcomplete onInput={handleSearch} search={search} list={searchedArtistList} handleSearchItem={handleSearchItem} />
            <Box variant="div" component="div">
              <Avatar sx={{ height: "120px", width: "120px" }} src={image} alt={name} />
            </Box>
          </Stack>
          <form
            action=""
            className={classess.page__fieldsContainer__form}
            autoComplete="off"
            onSubmit={handleSubmit}
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
                  value={name}
                  onInput={(event) => setName(event.target.value)}
                  placeholder="Enter Artist Name"
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
                  value={telephone}
                  onInput={(event) => setTelephone(event.target.value)}
                  name="telephone"
                  placeholder="Enter Number"
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
                  value={email}
                  onInput={(event) => setEmail(event.target.value)}
                  placeholder="Enter Email Address"
                  type="email"
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
                  City / State
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={cityState}
                  onInput={(event) => setCityState(event.target.value)}
                  placeholder="Enter City, State e.g. Karachi, Sindh"
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
                  Spotify ID *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={spotify_id}
                  onInput={(event) => setSpotify_id(event.target.value)}
                  placeholder="Enter Spotify Id"
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
                  Country
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  value={country}
                  onInput={(event) => setCountry(event.target.value)}
                  placeholder="Enter Country"
                  type="text"
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                gap: { xs: 3, sm: 8, lg: 15 },
                flexWrap: { xs: "wrap", sm: "nowrap" },
                alignItems: "flex-end",
              }}
            >
              <Box
                varient="div" component="div"
                className={classess.page__fieldsContainer__form__formfield}
                sx={{ width: "100%" }}
              >
                <Stack direction="column" gap={2}>
                  <span>Artist Image</span>
                  <Stack direction="row" gap={5}>
                    <Button
                      type="button"
                      className={
                        classess.page__fieldsContainer__form__choose_file
                      }
                      variant="contained"
                      sx={{ width: { xs: "100%", sm: "100%", lg: "45%" } }}
                      component="label"
                      onChange={handleAvatarChooseFile}
                    >
                      Choose File
                      <input hidden accept="image/*" type="file" />
                    </Button>
                    <Button
                      type="button"
                      className={classess.page__fieldsContainer__form__upload}
                      variant="contained"
                      component="label"
                      sx={{ width: { xs: "100%", sm: "100%", lg: "45%" } }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleAvatarUploads}
                      />
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Box
                varient="div" component="div"
                className={classess.page__fieldsContainer__form__formfield}
                sx={{ width: "100%" }}
              >
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  className={classess.page__fieldsContainer__form__submit_btn}
                  variant="contained"
                  sx={{ width: '100%' }}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default AddArtist;
