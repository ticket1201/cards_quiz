import React, {FC} from 'react';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import IconButton from '@mui/material/IconButton';

type ClearFiltersType = {
    clearHandler:()=>void
}

export const ClearFilters:FC<ClearFiltersType> = ({clearHandler}) => {


    const onClickHandler = () => clearHandler()

    return (
        <div>
            <IconButton onClick={onClickHandler}>
                <FilterAltOffOutlinedIcon/>
            </IconButton>
        </div>
    );
};