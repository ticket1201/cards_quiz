import React from 'react';
import {NavLink} from 'react-router-dom';
import {Path} from '../../enums/path';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import s from './BackToPacksList.module.css';
import Typography from '@mui/material/Typography';


export const BackToPacksList = () => {
    return (
            <NavLink to={`/${Path.PacksList}`} className={s.link}>
                <Typography className={s.text}><KeyboardBackspaceIcon/> <span>Back to Packs List</span></Typography>
            </NavLink>
    );
};