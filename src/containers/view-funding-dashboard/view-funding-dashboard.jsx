import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtistById } from "../../redux/slice/artist";
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import VerifyArtistList from '../../components/verify-artists/verify-artists';
import AddTracks from "./../tracks/add-track/add-track"
import { CustomSliderWithStyles, viewFundingDashboardSelectUseStyles } from "../../custom-mui-style/custom-mui-styles";
import VerifyList from "../../components/view-funding-dashboard-items/verify/list/verify-list";
import { getSongstateinfo } from "../../api/songstate.api";

const ViewFundingDashboard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const artist = useSelector((state) => state.artist.artist);
  const [sliderValue, setSliderValue] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (id) {
      initUIData();
    }
  }, [])

  const initUIData = () => {
    dispatch(
      getArtistById({
        id
      })
    )
  }

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSliders = (event) => {
    const { value, name } = event.target;

    setSliderValue({
      ...sliderValue,
      [name]: value
    })

  }

  const songStatsDataApi = () => {
    getSongstateinfo(artist?.songstats_artist_id, artist?.spotify_id).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    songStatsDataApi();
  }, [artist])


  const styles = viewFundingDashboardSelectUseStyles();

  return (
    <Container maxWidth="xl" className={styles.root}>
      <Box varient="div" component="div" className={classess.page}>
        <Box varient="div" component="div" sx={{}}>


          <Box varient="div" component="div" className={classess.page__artistInfo}>
            <Box varient="div" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <Box
                variant="div"
                component="div"
                className={classess.page__artistInfo__innerdetails}
              >

                <Box
                  variant="div"
                  component="div"
                  className={classess.page__artistInfo__imagleCircle}
                >
                  <Box
                    variant="div"
                    component="div"
                    className={classess.page__artistInfo__imagleCircle__inner_cirlcle}
                  >


                    <Avatar
                      src={artist?.avatar}
                      alt={artist?.name}
                      sx={{ height: 160, width: 160 }}
                    />
                  </Box>
                </Box>



              </Box>
              <Box varient="div" component="div">
                <Typography variant='p' sx={{ color: '#FFFFFF', fontSize: '30px', marginBottom: '47px' }}>
                  {artist?.name}
                </Typography>
                <Box varient="div" component="div">
                  <Typography variant="p" sx={{ color: '#FFFFFF' }}>
                    Total Tracks:
                  </Typography>
                  <Typography variant="p" sx={{ color: '#FFFFFF' }}>
                    72
                  </Typography>
                </Box>
                <Box varient="div" component="div" sx={{ display: 'flex', flexDirection: 'column', color: '#FFFFFF' }}>
                  <Typography variant="p">
                    Spotify ID:
                  </Typography>
                  <Typography variant="p">
                    {artist?.spotify_id}
                  </Typography>
                </Box>
              </Box>
              <Box varient="div" component='div' className={classess.page__artistInfo__balance}>
                <Typography varient="p" sx={{ fontSize: '28px', color: '#36A1FF', fontWeight: 'bold' }}>
                  Funding Estimate
                </Typography>
                <Typography varient="p" sx={{ fontSize: '55px', color: '#FFFFFF', fontWeight: 'bold' }}>
                  $ 63,744
                </Typography>
                <Typography varient="p" sx={{ fontSize: '16px', color: '#000000', fontWeight: '' }}>
                  see Breakdown
                </Typography>
              </Box>
            </Box>

          </Box>
          <Box varient="div" component="div" sx={{ width: '954px', typography: 'body1' }}>
            <TabContext value={value}>
              <Box varient="div" component="div" sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#000019', borderRadius: 4, marginTop: 3, display: 'flex', justifyContent: 'center', color: '#FFFFFF' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab sx={{ width: 200, color: '#FFFFFF' }} label="Verify" value="1" />
                  <Tab sx={{ width: 200, color: '#FFFFFF' }} label="Customize" value="2" />
                  <Tab sx={{ width: 200, color: '#FFFFFF' }} label="Send" value="3" />
                  <Tab sx={{ width: 200, color: '#FFFFFF' }} label="Confirm" value="4" />
                </TabList>
              </Box>
              <Box varient="div" component="div" sx={{ backgroundColor: '#0A1230', borderRadius: 4, marginTop: 3, height: '100%' }}>
                <TabPanel sx={{ color: '#FFFFFF' }} value="1">
                  <Box varient="div" component="div" sx={{ display: "flex", flexDirection: 'column', flex: 1, justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                    <Box varient="div" component="div" sx={{ display: "flex", flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', width: "100%" }}>
                      <Button sx={{ borderRadius: "26px", background: "#36A1FF", padding: "23px", padding: "7px 30px", color: "white", fontSize: "12px" }} onClick={handleOpen}>+ New Track</Button>
                    </Box>
                    <VerifyArtistList></VerifyArtistList>
                  </Box>

                </TabPanel>
                <TabPanel sx={{ color: '#FFFFFF' }} value="2">
                  <Box varient="div" component="div" className={classess.page__artistInfo__customizeTab}>
                    <Box variant="div" component="div" >
                      <Typography varient="p" sx={{ fontSize: "22px" }}>
                        Included Music Catalog <Checkbox defaultChecked />
                      </Typography>
                      <Box varient="div" component="div" sx={{ width: '658px', height: '8px', display: 'flex', alignItems: 'center', marginTop: '20px' }} className={classess.root}>
                        <CustomSliderWithStyles defaultValue={50} aria-label="Default" valueLabelDisplay="auto" name="songs" onChange={handleChangeSliders} />
                        <Typography varient="p" sx={{ marginLeft: '30px', fontSize: '15px', color: '#36A1FF', width: '100px' }}>
                          {sliderValue.songs || 50} Songs
                        </Typography>
                      </Box>
                    </Box>

                    <Box variant="div" component="div">
                      <Typography varient="p" sx={{ fontSize: "22px", marginTop: '32px' }}>
                        Length of Contract
                      </Typography>
                      <Box varient="div" component="div" sx={{ width: '658px', height: '8px', display: 'flex', alignItems: 'center', marginTop: '20px' }} className={classess.root}>
                        <CustomSliderWithStyles defaultValue={4} min={1} max={12} aria-label="Default" valueLabelDisplay="auto" name="year" onChange={handleChangeSliders} />
                        <Typography varient="p" sx={{ marginLeft: '30px', fontSize: '15px', color: '#36A1FF', width: '100px' }}>
                          {sliderValue.year || 4} Years
                        </Typography>
                      </Box>
                    </Box>

                    <Box variant="div" component="div">
                      <Typography varient="p" sx={{ fontSize: "22px", marginTop: '32px' }}>
                        Catalog Income Artist Keeps
                      </Typography>
                      <Box varient="div" component="div" sx={{ width: '658px', height: '8px', display: 'flex', alignItems: 'center', marginTop: '20px' }} className={classess.root}>
                        <CustomSliderWithStyles defaultValue={55} aria-label="Default" valueLabelDisplay="auto" name="percentage" onChange={handleChangeSliders} />
                        <Typography varient="p" sx={{ marginLeft: '30px', fontSize: '15px', color: '#36A1FF', width: '100px' }}>
                          {sliderValue.percentage || 55} %
                        </Typography>
                      </Box>
                    </Box>
                    <Box variant="div" component="div">
                      <Typography varient="p" sx={{ fontSize: "22px", marginTop: '32px' }}>
                        New Music Income Artist Keeps
                      </Typography>
                      <Box varient="div" component="div" sx={{ width: '658px', height: '8px', display: 'flex', alignItems: 'center', marginTop: '20px' }} className={classess.root}>
                        <CustomSliderWithStyles defaultValue={55} aria-label="Default" valueLabelDisplay="auto" name="income" onChange={handleChangeSliders} />
                        <Typography varient="p" sx={{ marginLeft: '30px', fontSize: '15px', color: '#36A1FF', width: '100px' }}>
                          {sliderValue.income || 55} %
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                </TabPanel>

                {/* Send Tab Barr*/}
                <TabPanel sx={{ color: '#FFFFFF' }} value="3">
                  <Box varient="div" component="div" className={classess.page__artistInfo__sendTab}>
                    <Box variant="div" component="div">
                      <Typography varient="p">
                        Provide your distributor name and upload their reports.
                      </Typography>
                      <Typography varient="p">
                        Acceptable File Formats: Microsoft Excel (.xls, .xlsx, .csv, .tsv), Text File (.txt), Numbers (.numbers)
                      </Typography>
                    </Box>
                    <Box varient="div" component="div" className={classess.page__artistInfo__sendTab__inputfields}>
                      <OutlinedInput placeholder="Please enter text" sx={{ backgroundColor: '#00002A', color: '#979797', width: '355px', height: '56px' }} />
                      <Button variant="contained" component="label" sx={{ backgroundColor: '#36A1FF', width: '216px', height: '44px', borderRadius: '8px' }}>
                        Upload
                        <input hidden accept="file/*" multiple type="file" />
                      </Button>
                      <Button variant="contained" sx={{ backgroundColor: '#EC1086', borderRadius: '20px', width: '113px', height: '40px' }}>
                        Add+
                      </Button>
                    </Box>
                    <Typography varient="p" sx={{ fontSize: '22px', marginTop: '28px' }}>
                      Upload History
                    </Typography>
                    <Typography varient="p" sx={{ fontSize: '16px', marginTop: '19px' }}>
                      Goin Straight In
                    </Typography>
                  </Box>
                </TabPanel>


                <TabPanel sx={{ color: '#FFFFFF' }} value="4">
                  <Box variant="div" component="div" className={classess.page__artistInfo__confirmTab}>
                    <Box varient="div" component="div" className={classess.page__artistInfo__confirmTab__offer}>
                      <Typography varient="p" sx={{ fontSize: '22px' }}>
                        Your Offer
                      </Typography>
                      <Typography varient="p" sx={{ marginTop: '16px' }}>
                        Please carefully review your offer.
                      </Typography>
                      <Button variant="contained" sx={{ backgroundColor: '#36A1FF', borderRadius: '20px', marginTop: '20px' }}>Download Offer</Button>
                    </Box>
                    <Box varient="div" component="div" className={classess.page__artistInfo__confirmTab__Accept}>
                      <Button variant="contained" sx={{ backgroundColor: '#36A1FF', borderRadius: '20px', marginRight: '18px' }}>Accept Offer</Button>
                      <Button variant="contained" sx={{ backgroundColor: '#EC1086', borderRadius: '20px' }}>Decline Offer</Button>
                    </Box>


                  </Box>
                </TabPanel>
              </Box>

            </TabContext>

          </Box>
        </Box>
        <Box varient="div" component="div" className={classess.page__rightsidetabs} sx={{ width: '475px', height: '900px', backgroundColor: '#000019' }}>

          {value === "1" && (
            // VerifyTab
            <VerifyList artist={artist} />
          )}
          {value === "2" && (
            <Box varient="div" component="div" className={classess.page__rightsidetabs__customizeFunding}>
              {/* customized */}
              <Typography varient='h3' sx={{ fontSize: '22px' }}>
                CUSTOMIZE FUNDING
              </Typography>
              <Typography varient='p' sx={{ fontSize: '14px' }}>
                Adjust the sliders to choose your funding options.
              </Typography>
              <Box varien="div" component="div" sx={{ display: 'flex', marginTop: '32px' }}>
                <Button sx={{ backgroundColor: '#36A1FF', borderRadius: '20px', paddingLeft: '36px', paddingRight: '36px', color: '#F5FBFF', marginRight: '15px' }}>Download PDF</Button>
                <Button sx={{ backgroundColor: '#EC1086', borderRadius: '20px', paddingLeft: '36px', paddingRight: '36px', color: '#F5FBFF', marginLeft: '15px' }}>Confirm</Button>
              </Box>
            </Box>
          )}
          {value === "3" && (
            // SendRightTab
            <Box varient="div" component="div" className={classess.page__rightsidetabs__customizeFunding}>
              <Typography varient='h3' sx={{ fontSize: '22px' }}>
                SEND REPORTS
              </Typography>
              <Typography varient='p' sx={{ fontSize: '14px' }}>
                Upload the last six months of detailed reports covering all tracks you want included in your advance offer.
              </Typography>
              <Box varien="div" component="div" sx={{ display: 'flex', marginTop: '32px' }}>
                <Button sx={{ backgroundColor: '#EC1086', borderRadius: '20px', paddingLeft: '36px', paddingRight: '36px', color: '#F5FBFF', marginLeft: '15px' }}>Submit for review</Button>
              </Box>
            </Box>
          )}
          {value === "4" && (
            <Box varient="div" component="div">
              {/* confirm */}
            </Box>
          )}
        </Box>
      </Box>
      <AddTracks open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </Container>
  )
}

export default ViewFundingDashboard;
