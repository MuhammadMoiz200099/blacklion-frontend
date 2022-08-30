import React from "react";
import { Help } from '@mui/icons-material';
import Home from '../containers/home/home';
import MySongs from '../containers/my-songs/my-songs';
import LoginContainer from '../containers/login/login';
import NotFound from "../components/notfound/notfound";
import MyArtist from '../containers/my-artist/my-artist';
import SignupContainer from '../containers/signup/signup';
import { Routes, Route, Navigate } from "react-router-dom";
import AddArtist from '../containers/artist/add-artist/add-artist';
import ViewArtist from '../containers/artist/view-artist/view-artist';
import EditArtist from '../containers/artist/edit-artist/edit-artist';
import BaseComponent from '../components/base-component/base-component';
import ForgotPassword from "../containers/forgot-password";
import ResetPassword from "../containers/reset-password/ResetPassword";
import ViewFundingDashboard from '../containers/view-funding-dashboard/view-funding-dashboard';
import { useSelector } from "react-redux";
import ProtectedRoute from "../protected-routes/protectedRoute";
import ProfilePage from '../containers/profile-page/profile-page'

const Navigation = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <Routes>
            <Route path="/blig" element={<BaseComponent />}>
                <Route index path="home" element={<ProtectedRoute isLoggedIn={user}> <Home /></ProtectedRoute>} />
                <Route index path="my-artist" element={<ProtectedRoute isLoggedIn={user}><MyArtist /></ProtectedRoute>} />
                <Route index path="my-songs" element={<ProtectedRoute isLoggedIn={user}><MySongs /></ProtectedRoute>} />
                <Route index path="add-artist" element={<ProtectedRoute isLoggedIn={user}><AddArtist /></ProtectedRoute>} />
                <Route index path="view-artist/:id" element={<ProtectedRoute isLoggedIn={user}><ViewArtist /></ProtectedRoute>} />
                <Route index path="edit-artist/:id" element={<ProtectedRoute isLoggedIn={user}><EditArtist /></ProtectedRoute>} />
                <Route index path="view-funding-dashboard/:id" element={<ProtectedRoute isLoggedIn={user}><ViewFundingDashboard /></ProtectedRoute>} />
                <Route index path="help" element={<ProtectedRoute isLoggedIn={user}><Help /></ProtectedRoute>} />
                <Route index path="profile" element={<ProtectedRoute isLoggedIn={user}>< ProfilePage/></ProtectedRoute>} />

            </Route>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/signup" element={<SignupContainer />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/blig/home" />} />
            <Route path="/blig" element={<Navigate to="/blig/home" />} />
        </Routes>
    )
}

export default Navigation;
