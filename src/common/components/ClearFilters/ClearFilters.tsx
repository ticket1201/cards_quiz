import React, {FC} from 'react';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import IconButton from '@mui/material/IconButton';

type ClearFiltersType = {
    clearHandler:()=>void
}

export const ClearFilters:FC<ClearFiltersType> = ({clearHandler}) => {


    const onClickHandler = () => clearHandler()

    return (
        <>
            <IconButton onClick={onClickHandler} sx={{alignSelf:'flex-end'}}>
                <FilterAltOffOutlinedIcon sx={{height:'32px', width:'32px'}}/>
            </IconButton>
        </>
    );
};