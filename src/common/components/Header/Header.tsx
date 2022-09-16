import React from 'react';
import s from './Header.module.css'
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

const Header = () => {
    return (
        <AppBar position="absolute" className={s.bar} style={{backgroundColor: '#FCFCFC'}}>
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
        </AppBar>
    );
};

export default Header;