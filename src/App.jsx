import React, { useEffect, useState } from 'react';
import './App.scss';
import Navigation from './navigation/navigation';
import { me } from "./redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import PreLoader from "./components/pre-loader/pre-loader";
import { destroySpotifySession, _fetchToken } from './utils/spotifyApiServiceHandler';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const userStatus = useSelector((state) => state.auth.status);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchSpotifyToken();
      dispatch(me());
    } else {
      setIsLoading(false);
      const urlPrefix = location.pathname.split('/')[1];
      if (urlPrefix === 'blig') {
        destroySpotifySession()
        navigate('/login');
      }
    }
  }, []);

  useEffect(() => {
    if (userStatus === 'succeeded' || userStatus === 'failed') {
      setIsLoading(false);
    }
  })

  useEffect(() => {
    if (userStatus === 'succeeded') {
      if (!user) {
        const urlPrefix = location.pathname.split('/')[1];
        if (urlPrefix === 'blig') {
          destroySpotifySession()
          navigate('/login');
        } else {
          navigate(location.pathname);
        }
      } else {
        const urlPrefix = location.pathname.split('/')[1];
        if (urlPrefix !== 'blig') {
          navigate('/blig/home');
        } else {
          if (location.search) {
            navigate(`${location.pathname}${location.search}`);
          } else {
            navigate(location.pathname);
          }
        }
      }
    } else if (userStatus === 'failed') {
      destroySpotifySession()
      navigate('/login');
    }
  }, [user]);


  const fetchSpotifyToken = async () => await _fetchToken();

  return (
    <>
      {
        isLoading ? (
          <PreLoader />
        ) : (
          <Navigation />
        )
      }
    </>
  );
}

export default App;
