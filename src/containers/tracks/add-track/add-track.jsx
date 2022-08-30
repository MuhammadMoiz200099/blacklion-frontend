import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classess from "./style.module.scss";
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1224,
  bgcolor: '#0A1230',
  border: '2px solid #286397',
  boxShadow: 24,
  p: 4,
  color:'#ffffff'
};

export default function AddTracks({ open, handleClose }) {
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box varient="div" component="div" sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              Add New Track
          </Typography>
          <Box 
            varient="div" 
            component="div"
            className={classess.page__fieldsContainer}
          >
            <form
            action=""
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
                  Track Title *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  name="Track_Title"
                  placeholder="Track Title"
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
                  ISRC *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  name="ISRC"
                  placeholder="ISRC"
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
                  Release Date *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  name="Release_date"
                  type="date"
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
                  Spotify Streams Total
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  name="Spotify_Streams_Total"
                  placeholder="Spotify Streams Total"
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
                  Deezer Reach Total
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  name="Deezer_Reach_Total"
                  placeholder="Deezer Reach Total"
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
                  TikTok Views Total
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  name="TikTok-Views-Total"
                  placeholder="TikTok Views Total"
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
                  Youtube Views Total *
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  name="Youtube_Views_Total"
                  placeholder="Youtube Views Total"
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
                  Income Share(%)
                </label>
                <input
                  className={
                    classess.page__fieldsContainer__form__formfield__input
                  }
                  name="Income_Share_"
                  placeholder="Income Share(%)"
                  type="text"
                />
              </Box>
            </Stack>
          </form>

            <Button sx={{background:'#EC1086', color: 'white',float:'right',width:'203px',height:'50px'}}>Save</Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}
