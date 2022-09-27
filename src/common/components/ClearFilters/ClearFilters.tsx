import React, {FC} from 'react';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import IconButton from '@mui/material/IconButton';
import {AnyAction} from 'redux';
import {useAppDispatch} from '../../hooks/hooks';

type ClearFiltersType = {
    clearAC:()=>AnyAction
}

export const ClearFilters:FC<ClearFiltersType> = ({clearAC}) => {

    const dispatch = useAppDispatch()

    const onClickHandler = () => dispatch(clearAC())

    return (
        <div>
            <IconButton onClick={onClickHandler}>
                <FilterAltOffOutlinedIcon/>
            </IconButton>
        </div>
    );
};