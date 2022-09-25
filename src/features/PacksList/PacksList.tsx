import React from 'react';
import UniversalTable from '../../common/components/Table/UniversalTable';
import {GridColDef} from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID'},
    {field: 'firstName', headerName: 'First name'},
    {field: 'lastName', headerName: 'Last name'},
    {field: 'age', headerName: 'Age', type: 'number'},
    {field: 'test', headerName: 'Test', type: 'string', sortable: false},
    /*{
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },*/
];

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, test: 'tralala'},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, test: 'weeeee'},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

const PacksList = () => {
    return (
        <>
            Packs list
            <UniversalTable columns={columns} rows={rows} pageSize={10} />
        </>
    );
};

export default PacksList;