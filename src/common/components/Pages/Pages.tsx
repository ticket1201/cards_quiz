import {Route, Routes} from 'react-router-dom';
import {Login} from '../../../features/Login/Login/Login';
import React from 'react';
import Profile from '../../../features/Profile/Profile';
import Registration from '../../../features/Login/Registration/Registration';
import ResetPassword from '../../../features/Login/ResetPassword/ResetPassword';
import Success from '../../../features/Login/Success/Success';
import NewPassword from '../../../features/Login/ResetPassword/NewPassword/NewPassword';
import Error404 from '../Error404/Error404';
import {Path} from '../../enums/path';
import {PrivateRoutes} from '../PrivateRoutes/PrivateRoutes';
import PacksList from '../../../features/PacksList/PacksList';
import PackPage from '../../../features/PackPage/PackPage';

export const Pages = () => {
    return <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path={Path.Profile} element={<Profile/>}/>
            <Route path={`${Path.PacksList}`} element={<PacksList/>}/>
            <Route path={`${Path.PackPage}/:packId`} element={<PackPage/>}/>
        </Route>
        <Route path={Path.Login} element={<Login/>}/>
        <Route path={Path.Registration} element={<Registration/>}/>
        <Route path={Path.ResetPassword} element={<ResetPassword/>}/>
        <Route path={`${Path.ResetSuccess}/:email`} element={<Success/>}/>
        <Route path={`${Path.NewPassword}/:token`} element={<NewPassword/>}/>
        <Route path={Path.Other} element={<Error404/>}/>
    </Routes>
};