import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import s from './BasicModal.module.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
};

type BasicModalType = {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

export const BasicModal: React.FC<BasicModalType> = ({isOpen, onClose, title, children}) => {
    const wrapperClass = isOpen ? '' : 'hidden';

    return (
        <div className={wrapperClass}>
            <Modal open={isOpen}
                   onClose={() => onClose()}>
                <Box sx={style}>
                    <div className={s.modalHeader}>
                        <h2 className={s.title}>
                            {title}
                        </h2>
                        <IconButton onClick={() => onClose()}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={s.modalBody}>
                        {children}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
