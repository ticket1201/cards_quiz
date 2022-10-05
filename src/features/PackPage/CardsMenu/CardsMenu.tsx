import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

type CardsMenuType = {
    isDisabled: boolean
    editPackCallback: () => void
    deletePackCallback: () => void
    learnPackCallback: () => void
}

export const CardsMenu: React.FC<CardsMenuType> = ({
                                                       isDisabled,
                                                       editPackCallback,
                                                       deletePackCallback,
                                                       learnPackCallback
                                                   }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const editHandler = () => {
        editPackCallback()
        setAnchorEl(null)
    }

    const deleteHandler = () => {
        deletePackCallback()
        setAnchorEl(null)
    }

    const learnHandler = () => {
        learnPackCallback()
        setAnchorEl(null)
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVert/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={editHandler}>
                    <IconButton>
                        <BorderColorOutlinedIcon/>
                    </IconButton> Edit
                </MenuItem>
                <MenuItem onClick={deleteHandler}>
                    <IconButton>
                        <DeleteOutlineOutlinedIcon/>
                    </IconButton> Delete
                </MenuItem>
                <MenuItem disabled={isDisabled} onClick={learnHandler}>
                    <IconButton>
                        <SchoolOutlinedIcon/>
                    </IconButton> Learn
                </MenuItem>
            </Menu>
        </>
    );
};