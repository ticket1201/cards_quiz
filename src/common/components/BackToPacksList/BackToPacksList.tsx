import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Path} from '../../enums/path';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import s from './BackToPacksList.module.css';
import Typography from '@mui/material/Typography';

type BackToPacksListType = {
    fromPacks?: boolean
    fromCards?: boolean
}

export const BackToPacksList: React.FC<BackToPacksListType> = ({fromPacks, fromCards}) => {

    const navigate = useNavigate()
    const navigationHandler = () => {
        if (fromPacks) {
            navigate(-1)
        } else if (fromCards) {
            navigate(-3)
        } else {
            navigate(`/${Path.PacksList}`)
        }
    }

    return (
        <Typography className={s.text} onClick={navigationHandler}><KeyboardBackspaceIcon/>
            <span>Back to Packs List</span>
        </Typography>
    );
};