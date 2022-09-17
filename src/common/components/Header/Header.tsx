import React from 'react';
import s from './Header.module.css'
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from '../../hooks/hooks';

const Header = () => {
    const status = useAppSelector(state => state.app.status)

    return (
        <>
            <AppBar position="relative" className={s.bar} style={{backgroundColor: '#FCFCFC'}}>
                <Toolbar className={s.toolbar}>
                    <Grid container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                    >
                        <div className={s.logo}></div>
                        <Button variant={'contained'}>Login</Button>
                    </Grid>
                </Toolbar>
                <div>
                    {status === 'loading' && <LinearProgress/>}
                </div>
            </AppBar>
        </>
    );
};

export default Header;