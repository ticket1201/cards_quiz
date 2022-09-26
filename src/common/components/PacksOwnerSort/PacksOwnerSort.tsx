import React, {useEffect} from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {getPacksTC, sortPacksByOwnerAC} from '../../../features/PacksList/pack_reducer';

export const PacksOwnerSort = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth._id)
    const ownerId = useAppSelector(state => state.packs.user_id)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [ownerId])

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