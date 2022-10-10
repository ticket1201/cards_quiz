import React, {ChangeEvent, useRef} from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import s from './Profile.module.css'
import ava from '../../assets/images/avatar.jpg'
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {logoutTC, updateProfileTC} from '../Login/auth_reducer';
import {BackToPacksList} from '../../common/components/BackToPacksList/BackToPacksList';
import {convertToBase64} from '../../common/utils/convertToBase64';
import {setAppErrorAC} from '../../app/app_reducer';


const Profile = () => {
    const {name, email, avatar} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const uploadInputRef = useRef<HTMLInputElement>(null);

    const HandlerLogOut = () => {
        dispatch(logoutTC())
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertToBase64(file, (file64: string) => {
                    dispatch(updateProfileTC({name, avatar: file64}))
                })
            } else {
                dispatch(setAppErrorAC('File size is too big'))
            }
        }
    }

    const HandlerUpdateData = (name: string) => {
        dispatch(updateProfileTC({name, avatar}))
    }

    return (
        <div>
            <div className={s.backToPacks}>
                <BackToPacksList/>
            </div>
            <Paper className={'defaultPop'} elevation={2}>
                <h2 className={s.title}>Personal Information</h2>
                <div className={s.ava} style={{backgroundImage: `url(${avatar || ava})`}}>
                    <div className={s.buttonWrapper}>
                        <IconButton className={s.button}
                                    onClick={() => uploadInputRef.current && uploadInputRef.current.click()}>
                            +
                            <input ref={uploadInputRef} type={'file'} accept={'image/*'} onChange={onChangeHandler}
                                   hidden/>
                        </IconButton>
                    </div>
                </div>
                <EditableSpan value={name} disabled={false} onChange={HandlerUpdateData}/>
                <p className={s.email}>{email}</p>
                <Button variant={'outlined'} className={s.logOut}
                        startIcon={<LogoutOutlinedIcon/>} onClick={() => HandlerLogOut()}>
                    <span className={s.text}>Log Out</span>
                </Button>
            </Paper>
        </div>
    );
};

export default Profile;