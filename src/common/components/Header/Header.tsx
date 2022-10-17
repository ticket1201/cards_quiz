import React, {useState} from 'react';
import s from './Header.module.css'
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {NavLink, useNavigate} from 'react-router-dom';
import ava from '../../../assets/images/avatar.jpg'
import {Path} from '../../enums/path';
import {logoutTC} from '../../../features/Login/auth_reducer';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';

const Header = () => {
    const navigate = useNavigate()
    const {name, avatar} = useAppSelector(state => state.auth)
    let status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const onMenuClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(e.currentTarget)
    }
    const onProfileClickHandler = () => {
        menuCloseHandler()
        navigate(`${Path.Profile}`)
    }
    const onLogoutClickHandler = () => {
        menuCloseHandler()
        dispatch(logoutTC())
    }

    const menuCloseHandler = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position={'absolute'} className={s.bar} style={{backgroundColor: '#FCFCFC'}}>
            <Toolbar className={`${s.toolbar}`} style={{position:'relative'}}>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                >
                    <NavLink className={s.logo} to={Path.PacksList}></NavLink>
                    {name
                        ? <div className={s.avaWrapper}>
                            <span className={s.name} onClick={onMenuClickHandler}>{name}</span>
                            <span className={s.ava} style={{backgroundImage: `url(${avatar || ava})`}}
                               onClick={onMenuClickHandler}></span>
                            <Menu className={s.menu} open={open} onClose={menuCloseHandler} anchorEl={anchorEl}>
                                <MenuItem onClick={onProfileClickHandler} className={s.menuItem}><PermIdentityIcon/> Profile</MenuItem>
                                <MenuItem onClick={onLogoutClickHandler} className={s.menuItem}>
                                  <LogoutOutlinedIcon/> <span>Log Out</span>
                                </MenuItem>
                            </Menu>
                        </div>
                        : <Button variant={'contained'} onClick={() => navigate(Path.Login)}>Sign in</Button>}
                </Grid>

            </Toolbar>
            {status === 'loading' &&
            <LinearProgress color={'primary'} sx={{bottom:0, left: '0', right: '0', position: 'absolute'}}/>}
        </AppBar>
    );
};

export default Header;