import {useAppSelector} from '../../hooks/hooks';
import {Navigate, Outlet} from 'react-router-dom';
import {Path} from '../../enums/path';
import React from 'react';

export const PrivateRoutes = () => {
    const userId = useAppSelector(state => state.auth._id)
    return (
        userId ? <Outlet/> : <Navigate to={Path.Login}/>
    )
}