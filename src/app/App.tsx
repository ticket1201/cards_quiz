import React, {useEffect} from 'react';
import './App.css';
import Header from '../common/components/Header/Header';
import {UniversalSnackbar} from '../common/components/CustomSnackbar/CustomSnackbar';
import Grid from '@mui/material/Grid';
import {useAppDispatch, useAppSelector} from '../common/hooks/hooks';
import {authMeTC} from '../features/Login/auth_reducer';
import {Preloader} from '../common/components/Preloader/Preloader';
import {Pages} from '../common/components/Pages/Pages';
/*import {Link} from 'react-router-dom';
import {Path} from '../common/enums/path';*/


function App() {
    const dispatch = useAppDispatch()
    let isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])


    if (!isInitialized) {
        return (<Preloader/>)
    }

    return (
        <div className="App">
            <Header/>
            <UniversalSnackbar/>
            <Grid container className={'base-wrapper'} justifyContent={'center'}>
                <Pages/>
            </Grid>

            {/*temp navigation*/}

            {/*  <div className="App-header">
                <Link to={Path.Login}>Login</Link>
                <Link to={Path.Registration}>Registration</Link>
                <Link to={Path.Profile}>Profile</Link>
                <Link to={Path.Error404}>404</Link>
                <Link to={Path.ResetPassword}>Reset pass</Link>
                <Link to={`${Path.ResetSuccess}/email@example.com`}>Rest success</Link>
                <Link to={`${Path.NewPassword}/token`}>New pass</Link>
                <Link to={`${Path.PacksList}`}>Packs list</Link>
                <Link to={`${Path.PackPage}`}>Pack page</Link>
                <Link to={`learn/63319bd2ef99210257c3d013`}>Learn page</Link>
            </div>
            */}
        </div>
    );
}

export default App;
