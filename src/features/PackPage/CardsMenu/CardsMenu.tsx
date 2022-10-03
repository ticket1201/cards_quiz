import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

export const CardsMenu = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
            >
                <MoreVert/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}><BorderColorOutlinedIcon/> Edit</MenuItem>
                <MenuItem onClick={handleClose}><DeleteOutlineOutlinedIcon/> Delete</MenuItem>
                <MenuItem onClick={handleClose}><SchoolOutlinedIcon/> Learn</MenuItem>
            </Menu>
        </>
    );
};