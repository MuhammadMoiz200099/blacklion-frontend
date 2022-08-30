import React,{ useEffect, useState } from 'react';
import classess from "./style.module.scss";
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton"
import editIcon from "../../assets/icons/edit.svg";
import IconButton from "@mui/material/IconButton";

const ProfilePage = () =>{
    const [avatar, setAvatar] = useState();
    const [image, setImage] = useState();
    const [isProfileChanged, setIsProfileChanged] = useState(false);
    const handleProfileChange = (event) => {
        setAvatar(event.target.files[0]);
        setImage(URL.createObjectURL(event.target.files[0]))
        setIsProfileChanged(true);
        event.target.files = null;
      };
    const user = useSelector((state) => state.auth.user);

    return(
        <Container maxWidth="xl">
            <Box varient="div" component="div" className={classess.page}>
                <Box varient="div" component="div" className={classess.page__title_bar}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        component="div"
                        className={classess.page__title_bar__title}
                        >
                        User Profile
                    </Typography>
                </Box>
                <Box
                    varient="div"
                    component="div"
                    sx={{ p: { xs: 2, sm: 3, lg: 5 }, mt: 3 }}
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
                                    First Name
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.firstName}
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
                                    Last Name
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.lastName}
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
                                    Email
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.email}
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
                                    Username
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.username}
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
                                    Password
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.passwrod}
                                    type="password"
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
                                    Conform Password
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.confirmpassword}
                                    type="password"
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
                                    Phone
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.phone}
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
                                    Company
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.company}
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
                                    Country
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.country}
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
                                    Website
                                </label>
                                <input
                                    className={
                                        classess.page__fieldsContainer__form__formfield__input
                                    }
                                    value={user?.website}
                                    type="text"
                                    required
                                />
                            </Box>  
                        </Stack>
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
                                src={user?.image}
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
                        </Box>
                        <Box
                            varient="div" component="div"
                            className={classess.page__fieldsContainer__form__formfield}
                            sx={{ width: "100%" }}
                           >
                                <LoadingButton
                                    type="submit"
                                    className={classess.page__fieldsContainer__form__submit_btn}
                                    variant="contained"
                                    sx={{ width: '100%' }}
                                    >
                                    Submit
                                </LoadingButton>
                            </Box>
                                        
                 </form>
                         
                </Box>
                
            </Box>
        </Container>
    )
}

export default ProfilePage