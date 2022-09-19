import React from 'react';
import Paper from '@mui/material/Paper';
import s from './Success.module.css';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from 'react-router-dom';
import img from '../../../assets/images/envelope.svg'

const Success = () => {
    const navigate = useNavigate()
    const {email} = useParams()

    return (
        <div className={'base-wrapper'}>
            <Paper className={'defaultPop'} elevation={2}>
                <h2>Check Email</h2>
                <img src={img} alt="envelope" className={s.img}/>
                <p className={s.text}>We’ve sent an Email with instructions to {email!.slice(1)}</p>
                <Button variant={'contained'} onClick={() => navigate('/')} fullWidth>Back to login</Button>
            </Paper>
        </div>
    );
};

export default Success;