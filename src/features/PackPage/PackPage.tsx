import React from 'react';
import {GridColDef} from '@mui/x-data-grid';
import UniversalTable from '../../common/components/Table/UniversalTable';
import Rating from '@mui/material/Rating';


const columns: GridColDef[] = [
    {
        field: 'question', headerName: 'Question', renderHeader: () => (
            <strong>
                {'Birthday '}
                <span role="img" aria-label="enjoy">
          🎂
        </span>
            </strong>
        ),
    },
    {field: 'answer', headerName: 'Answer'},
    {field: 'lastUpdated', headerName: 'Last updated'},
    {
        field: 'grade',
        headerName: 'Grade',
        renderCell: (params) => (
            <Rating name={params.row.id} defaultValue={params.row.grade} precision={0.1} readOnly/>
        ),
        width: 140
    },
    {field: 'actions', headerName: 'Actions', sortable: false}
];

const rows = [
    {id: '1', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 2.3, actions: 'r d cv'},
    {id: '2', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4, actions: 'r d cv'},
    {id: '3', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 0.2, actions: 'r d cv'},
    {id: '4', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4.5, actions: 'r d cv'},
    {id: '5', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 5, actions: 'r d cv'},
    {id: '6', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 3.2, actions: 'r d cv'},
    {
        id: '7', question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022',
        grade: 4,
        actions: 'r d cv'
    },
];

const PackPage = () => {


    /*const newRows = rows.map(e => ({
        ...e,
        grade: {
            renderCell: () => (
                <Rating name={e.id} defaultValue={e.grade} precision={0.1} readOnly/>
            )
        }
    }))*/

    return (
        <>
            <div><Rating name="half-rating-read6" defaultValue={1.7} precision={0.1} readOnly/></div>
            Pack page
            <UniversalTable columns={columns} rows={rows}/>
        </>
    );
};

export default PackPage;
