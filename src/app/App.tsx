import React, {useEffect} from 'react';
import './App.css';
import {Link, Route, Routes} from 'react-router-dom';
import Login from '../features/Login/Login';
import Error404 from '../features/Error404/Error404';
import Registration from '../features/Login/Registration/Registration';
import ResetPassword from '../features/Login/ResetPassword/ResetPassword';
import NewPassword from '../features/Login/ResetPassword/NewPassword/NewPassword';
import Profile from '../features/Profile/Profile';
import Header from '../common/components/Header/Header';
import CustomSnackbar from '../common/components/CustomSnackbar/CustomSnackbar';
import Grid from '@mui/material/Grid';
import Templates from '../common/Templates/Templates';
import Success from '../features/Login/Success/Success';
import {useAppDispatch, useAppSelector} from '../common/hooks/hooks';
import {AuthMeTC} from '../features/Login/auth_reducer';
import LinearProgress from '@mui/material/LinearProgress';
import {Preloader} from '../common/components/Preloader/Preloader';


function App() {
    const dispatch = useAppDispatch()
    let status = useAppSelector(state => state.app.status)
    let isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(AuthMeTC())
    }, [])


    if(!isInitialized){
        return (<Preloader/>)
    }

    return (
        <div className="App">
            <Header/>
            {status === 'loading' && <LinearProgress color={'inherit'} sx={{top:'60px', left:'0', right:'0', position:'absolute'}}/>}
            <CustomSnackbar/>
            <Grid container className={'content-wrapper'}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="registration" element={<Registration/>}/>
                    <Route path="reset" element={<ResetPassword/>}/>
                    <Route path="reset/success:email" element={<Success/>}/>
                    <Route path="set-new-password/:token" element={<NewPassword/>}/>
                    <Route path="templates" element={<Templates/>}/>
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </Grid>

            {/*temp navigation*/}
            <div className="App-header">
                <Link to={'/'}>Login</Link>
                <Link to={'/registration'}>Registration</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/Error404'}>404</Link>
                <Link to={'/reset'}>Reset pass</Link>
                <Link to={'/reset/success:email'}>Rest success</Link>
                <Link to={'/set-new-password/:token'}>New pass</Link>
                <Link to={'/templates'}>Templates</Link>
            </div>
        </div>
    );
}

export default App;