import React from 'react';
import {GridColDef} from '@mui/x-data-grid';
import UniversalTable from '../../common/components/Table/UniversalTable';

const columns: GridColDef[] = [
    {field: 'question', headerName: 'Question'},
    {field: 'answer', headerName: 'Answer'},
    {field: 'lastUpdated', headerName: 'Last updated'},
    {field: 'grade', headerName: 'Grade'},
    {field: 'actions', headerName: 'Actions', sortable: false}
];

const rows = [
    {id: 1, question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4, actions: 'r d cv'},
    {id: 2, question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4, actions: 'r d cv'},
    {id: 3, question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4, actions: 'r d cv'},
    {id: 4, question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4, actions: 'r d cv'},
    {id: 5, question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4, actions: 'r d cv'},
    {id: 6, question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4, actions: 'r d cv'},
    {id: 7, question: 'How are you?', answer: 'Good', lastUpdated: '02.05.2022', grade: 4, actions: 'r d cv'},
];

const PackPage = () => {
    return (
        <>
            Pack page
            <UniversalTable columns={columns} rows={rows} pageSize={3}/>
        </>
    );
};

export default PackPage;