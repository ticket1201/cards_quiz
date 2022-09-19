import React from 'react';
import s from './Header.module.css'
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from '../../hooks/hooks';
import {NavLink, useNavigate} from 'react-router-dom';
import ava from '../../../assets/images/avatar.jpg'

const Header = () => {
    const status = useAppSelector(state => state.app.status)

    const {name, avatar} = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const HandlerClick = () => {
        return navigate('/')
    }


    return (
        <AppBar position="absolute" className={s.bar} style={{backgroundColor: '#FCFCFC'}}>
            <Toolbar className={`${s.toolbar} base-wrapper`}>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                >
                    <NavLink className={s.logo} to={'/'}></NavLink>
                    {name
                        ? <div className={s.avaWrapper}>
                            <NavLink to={'/profile'}>{name}</NavLink>
                            <NavLink className={s.ava} style={{backgroundImage:`url(${ava})`}} to={'/profile'}></NavLink>
                        </div>
                        : <Button variant={'contained'} onClick={() => HandlerClick()}>Login</Button>}
                </Grid>
            </Toolbar>
            <div>
                {status === 'loading' && <LinearProgress/>}
            </div>
        </AppBar>
    );
};

export default Header;