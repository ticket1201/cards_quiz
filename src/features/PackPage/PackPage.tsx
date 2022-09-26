import React from 'react';
import {GridColDef} from '@mui/x-data-grid';
import UniversalTable from '../../common/components/Table/UniversalTable';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


let columns: GridColDef[] = [
    {
        field: 'question',
        headerName: 'Question',
        /*renderHeader: () => (
            <strong>
                {'Birthday '}
                <span role="img" aria-label="enjoy">
          🎂
        </span>
            </strong>
        ),*/
        flex: 1
    },
    {field: 'answer', headerName: 'Answer', flex: 1},
    {field: 'lastUpdated', headerName: 'Last updated', flex: 1},
    {
        field: 'grade',
        headerName: 'Grade',
        renderCell: (params) => (
            <Rating name={params.row.id} defaultValue={params.row.grade} precision={0.1} readOnly/>
        ),
        minWidth: 140
    },
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        minWidth: 100,
        renderCell: () => (
            <>
                <IconButton>
                    <EditIcon/>
                </IconButton>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </>
        )
    }
];

const rows = [
    {id: '1', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 2.3},
    {id: '2', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4},
    {id: '3', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 0.2},
    {id: '4', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4.5},
    {id: '5', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 5},
    {id: '6', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 3.2},
    {id: '7', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4},
];

const PackPage = () => {
    const myPack = false
    if (myPack)
        columns = columns.filter(e => e.field !== 'actions')


    return (
        <>
            Pack page
            <UniversalTable columns={columns} rows={rows} pageSize={10}/>
        </>
    );
};

export default PackPage;
