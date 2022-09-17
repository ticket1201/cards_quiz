import React from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../common/hooks/hooks';
import s from './Profile.module.css'
import ava from '../../assets/images/avatar.jpg'
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';


const Profile = () => {
    const {name,email, /*avatar*/} = useAppSelector(state => state.auth)
    return (
        <Paper className={'defaultPop'} elevation={2}>
           <h2>Personal Information</h2>
            <div className={s.ava} style={{backgroundImage:`url(${ava})`}}>
                <div className={s.buttonWrapper}>
                    <IconButton className={s.button}>+</IconButton>
                </div>
            </div>
            <EditableSpan value={name} disabled={false} onChange={()=>{}}/>
            <p>{email}</p>
            <Button>Log Out</Button>
        </Paper>
    );
};

export default Profile;