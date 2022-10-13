import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

type PacksOwnerSortType = {
    owner: string | undefined
    packsOwnerHandler: (ownerId: string) => void
}

export const PacksOwnerSort: React.FC<PacksOwnerSortType> = ({owner, packsOwnerHandler}) => {

    const getMyPacksHandler = () => packsOwnerHandler('my')
    const getAllPacksHandler = () => packsOwnerHandler('')

    return (
        <div>
            <h3>Show packs cards</h3>
            <ButtonGroup>
                <Button onClick={getMyPacksHandler} sx={{width: '100px'}}
                        variant={owner ? 'contained' : 'outlined'}>My</Button>
                <Button onClick={getAllPacksHandler} sx={{width: '100px'}}
                        variant={owner ? 'outlined' : 'contained'}>All</Button>
            </ButtonGroup>
        </div>
    );
};