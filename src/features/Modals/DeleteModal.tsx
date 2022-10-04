import React from 'react';
import {BasicModal} from '../../common/components/BasicModal/BasicModal';
import Button from '@mui/material/Button';
import {Stack} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {deletePackTC} from '../PacksList/pack_reducer';
import {closeModalAC} from './modal_reducer';

type DeleteModalType = {
    title: string
}

export const DeleteModal: React.FC<DeleteModalType> = ({title}) => {
    const {_id, name, openDelPackModal, openDelCardModal} = useAppSelector(state => state.modals)
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(deletePackTC(_id))
        closeHandler()
    }
    const closeHandler = () => {
        dispatch(closeModalAC())
    }

    return (
        <BasicModal isOpen={openDelPackModal || openDelCardModal} onClose={closeHandler} title={title}>
            <div>Do you really want to remove <b>{name}</b> ?</div>
            {title === 'Delete Pack'
                ? <div>All cards will be deleted.</div>
                : <div>This card will be deleted</div>}
            <Stack spacing={2} direction={'row'} justifyContent={'space-between'} sx={{marginTop: '26px'}}>
                <Button variant={'outlined'}
                        onClick={closeHandler}
                        sx={{width: '115px'}}>Cancel</Button>
                <Button variant={'contained'}
                        color={'error'}
                        onClick={deleteHandler}
                        sx={{width: '115px'}}>Delete</Button>
            </Stack>
        </BasicModal>
    );
};