import React from 'react';
import UniversalTable from '../../common/components/Table/UniversalTable';
import {GridColDef} from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name'},
    {field: 'cards', headerName: 'Cards'},
    {field: 'lastUpdated', headerName: 'Last updated'},
    {field: 'createdBy', headerName: 'Created by'},
    {field: 'actions', headerName: 'Actions', sortable: false}
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
    {id: '1', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: '1 2 3'},
    {id: '2', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: '1 2 3'},
    {id: '3', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: '1 2 3'},
    {id: '4', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: '1 2 3'},
    {id: '5', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: '1 2 3'},
    {id: '6', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: '1 2 3'},
    {id: '7', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: '1 2 3'},
    {id: '8', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: '1 2 3'},
    {id: '9', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: '1 2 3'},
    {id: '10', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: '1 2 3'},
    {id: '11', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: '1 2 3'},
    {id: '12', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: '1 2 3'},
    {id: '13', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: '1 2 3'},
    {id: '14', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: '1 2 3'},
    {id: '15', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: '1 2 3'},

];

const PacksList = () => {
    return (
        <>
            Packs list
            <UniversalTable columns={columns} rows={rows} pageSize={10}/>
        </>
    );
};

export default PacksList;