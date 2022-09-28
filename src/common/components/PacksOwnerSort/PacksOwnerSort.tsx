import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppSelector} from '../../hooks/hooks';

type PacksOwnerSortType = {
    owner: string | null
    packsOwnerHandler: (ownerId: string) => void
}

export const PacksOwnerSort: React.FC<PacksOwnerSortType> = ({owner, packsOwnerHandler}) => {

    const userId = useAppSelector(state => state.auth._id)


    const getMyPacksHandler = () => userId && packsOwnerHandler(userId)
    const getAllPacksHandler = () => packsOwnerHandler('')

    return (
        <div>
            <h3>Show packs cards</h3>
            <ButtonGroup>
                <Button onClick={getMyPacksHandler} sx={{width:'100px'}} variant={owner ? 'contained' : 'outlined'}>My</Button>
                <Button onClick={getAllPacksHandler} sx={{width:'100px'}} variant={owner ? 'outlined' : 'contained'}>All</Button>
            </ButtonGroup>
        </div>
    );
};