import React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import s from './Profile.module.css'
import ava from '../../assets/images/avatar.jpg'
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {LogoutTC} from '../Login/auth_reducer';
import {Navigate} from 'react-router-dom';


const Profile = () => {
    const {_id, name,email, /*avatar*/} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const HandlerLogOut = () => {
        dispatch(LogoutTC())
    }

    if(!_id){
      return <Navigate to={'/'}/>
    }

    return (
        <div className={'base-wrapper'}>
            <Paper className={'defaultPop'} elevation={2}>
                <h2>Personal Information</h2>
                <div className={s.ava} style={{backgroundImage:`url(${ava})`}}>
                    <div className={s.buttonWrapper}>
                        <IconButton className={s.button}>+</IconButton>
                    </div>
                </div>
                <EditableSpan value={name} disabled={false} onChange={()=>{}}/>
                <p className={s.email}>{email}</p>
                <Button variant={'outlined'} className={s.logOut} startIcon={'+'} onClick={()=>HandlerLogOut()}>Log Out</Button>
            </Paper>
        </div>
    );
};

export default Profile;