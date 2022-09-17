import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = memo(({value, onChange, disabled}: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(true);
    let [title, setTitle] = useState(value);

    const activateEditMode = () => {
        if(!disabled){
            setEditMode(true);
            setTitle(value);
        }
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return editMode
        ?  <h3 className={s.text}>
            <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} size={'small'} onKeyDown={onKeyPressHandler}></TextField>
            <Button variant={'contained'} className={s.button}>Save</Button>
        </h3>
        : <h3 onDoubleClick={activateEditMode} className={s.text}>{value} <IconButton>+</IconButton></h3>
})
