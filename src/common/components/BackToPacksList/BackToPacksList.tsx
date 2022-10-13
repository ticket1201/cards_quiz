import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Path} from '../../enums/path';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import s from './BackToPacksList.module.css';
import Typography from '@mui/material/Typography';


export const BackToPacksList = () => {

    const navigate = useNavigate()
    const navigationHandler = () => {
        navigate(`/${Path.PacksList}`)
    }

    return (
        <Typography className={s.text} onClick={navigationHandler}><KeyboardBackspaceIcon/>
            <span>Back to Packs List</span>
        </Typography>
    );
};