import React, {useEffect} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Header from '../common/components/Header/Header';
import {UniversalSnackbar} from '../common/components/CustomSnackbar/CustomSnackbar';
import Grid from '@mui/material/Grid';
import {useAppDispatch, useAppSelector} from '../common/hooks/hooks';
import {authMeTC} from '../features/Login/auth_reducer';
import LinearProgress from '@mui/material/LinearProgress';
import {Preloader} from '../common/components/Preloader/Preloader';
import {Pages} from '../common/components/Pages/Pages';
import {Path} from '../common/enums/path';


function App() {
    const dispatch = useAppDispatch()
    let status = useAppSelector(state => state.app.status)
    let isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])


    if(!isInitialized){
        return (<Preloader/>)
    }

    return (
        <div className="App">
            <Header/>
            {status === 'loading' && <LinearProgress color={'inherit'} sx={{top:'60px', left:'0', right:'0', position:'absolute'}}/>}
            <UniversalSnackbar/>
            <Grid container className={'content-wrapper'}>
                <Pages/>
            </Grid>

            {/*temp navigation*/}
            <div className="App-header">
                <Link to={Path.Login}>Login</Link>
                <Link to={Path.Registration}>Registration</Link>
                <Link to={Path.Profile}>Profile</Link>
                <Link to={Path.Error404}>404</Link>
                <Link to={Path.ResetPassword}>Reset pass</Link>
                <Link to={`${Path.ResetSuccess}/email@example.com`}>Rest success</Link>
                <Link to={`${Path.NewPassword}/token`}>New pass</Link>
            </div>
        </div>
    );
}

export default App;
