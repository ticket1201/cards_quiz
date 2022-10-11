import React, {ChangeEvent} from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {convertToBase64} from '../../utils/convertToBase64';
import {setAppErrorAC} from '../../../app/app_reducer';
import Button from '@mui/material/Button';
import s from './UploadButton.module.css';

type UploadButtonType = {
    title: string
    imgURL: string
    saveImgUrl: (imgURL: string) => void
}
export const UploadButton: React.FC<UploadButtonType> = ({title, imgURL, saveImgUrl}) => {

    const dispatch = useAppDispatch()

    const onCoverChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertToBase64(file, (img64: string) => {
                    saveImgUrl(img64)
                })
            } else {
                dispatch(setAppErrorAC('File size is too big'))
            }
        }
    }

    return <>
        <Button variant="contained" component="label" sx={{marginBottom: '30px'}}>
            {title}
            <input hidden accept="image/*" type="file" onChange={onCoverChangeHandler}/>
        </Button>
        {imgURL && <div className={s.image} style={{backgroundImage: `url(${imgURL})`}}/>}
    </>
}