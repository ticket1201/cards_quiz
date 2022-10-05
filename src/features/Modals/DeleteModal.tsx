import React from 'react';
import {BasicModal} from '../../common/components/BasicModal/BasicModal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useAppDispatch} from '../../common/hooks/hooks';
import {deletePackTC} from '../PacksList/pack_reducer';
import {deleteCardTC} from '../PackPage/cards_reducer';

type DeleteModalType = {
    _id: string
    name?: string
    question?: string
    title: string
    isOpen: boolean
    onClose: () => void
}

export const DeleteModal: React.FC<DeleteModalType> = ({_id, name, question, title, isOpen, onClose}) => {
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        question ? dispatch(deleteCardTC(_id)) : dispatch(deletePackTC(_id))
        onClose()
    }

    return (
        <BasicModal isOpen={isOpen} onClose={onClose} title={title}>
            <div>Do you really want to remove <b>{name || question}</b> ?</div>
            {title === 'Delete Pack'
                ? <div>All cards will be deleted.</div>
                : <div>This card will be deleted</div>}
            <Stack spacing={2} direction={'row'} justifyContent={'space-between'} sx={{marginTop: '26px'}}>
                <Button variant={'outlined'}
                        onClick={onClose}
                        sx={{width: '115px'}}>Cancel</Button>
                <Button variant={'contained'}
                        color={'error'}
                        onClick={deleteHandler}
                        sx={{width: '115px'}}>Delete</Button>
            </Stack>
        </BasicModal>
    );
};