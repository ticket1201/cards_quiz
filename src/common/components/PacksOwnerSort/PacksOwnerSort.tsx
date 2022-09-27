import React, {useEffect} from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getPacksTC} from '../../../features/PacksList/pack_reducer';
import {sortPacksByOwnerAC} from '../../../features/SearchBar/search-reducer';

export const PacksOwnerSort = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth._id)
    const ownerId = useAppSelector(state => state.search.user_id)

    useEffect(() => {
        dispatch(getPacksTC({user_id: ownerId}))
    }, [ownerId, dispatch])

    const getMyPacksHandler = () => dispatch(sortPacksByOwnerAC(userId))
    const getAllPacksHandler = () => dispatch(sortPacksByOwnerAC())

    return (
        <div>
            <ButtonGroup>
                <Button onClick={getMyPacksHandler} variant={ownerId ? 'contained' : 'outlined'}>My</Button>
                <Button onClick={getAllPacksHandler} variant={ownerId ? 'outlined' : 'contained'}>All</Button>
            </ButtonGroup>
        </div>
    );
};