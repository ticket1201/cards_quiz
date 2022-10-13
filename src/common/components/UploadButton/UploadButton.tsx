import React, {ChangeEvent} from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {convertToBase64} from '../../utils/convertToBase64';
import {setAppErrorAC} from '../../../app/app_reducer';
import Button from '@mui/material/Button';
import s from './UploadButton.module.css';
import {RegisterOptions} from 'react-hook-form';

type UploadButtonType = {
    title: string
    label?: string
    name: string
    imgURL: string
    register: any
    options?: RegisterOptions
    saveImgUrl: (imgURL: string) => void
}
export const UploadButton: React.FC<UploadButtonType> = ({
                                                             title,
                                                             label,
                                                             name,
                                                             imgURL,
                                                             register,
                                                             options,
                                                             saveImgUrl
                                                         }) => {

    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
        <span className={s.label}>{label}</span>
        <Button variant="contained" component="label">
            {title}
            <input hidden accept="image/*" type="file" {...register(name, options)} onChange={onChangeHandler}/>
        </Button>
        {imgURL && <div className={s.image} style={{backgroundImage: `url(${imgURL})`}}/>}
    </>
}