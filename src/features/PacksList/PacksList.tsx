import React from 'react';
import UniversalTable from '../../common/components/Table/UniversalTable';
import {GridColDef} from '@mui/x-data-grid';
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'cards', headerName: 'Cards', flex: 1},
    {field: 'lastUpdated', headerName: 'Last updated', flex: 1},
    {field: 'createdBy', headerName: 'Created by', flex: 1},
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        minWidth: 150,
        renderCell: (params) => (
            <>
                <IconButton>
                    <SchoolIcon/>
                </IconButton>
                {params.row.actions && <>
                    <IconButton>
                        <EditIcon/>
                    </IconButton>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </>}
            </>
        ),
    }
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
    {id: '1', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: true},
    {id: '2', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: false},
    {id: '3', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: false},
    {id: '4', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: false},
    {id: '5', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: true},
    {id: '6', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: false},
    {id: '7', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: false},
    {id: '8', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: false},
    {id: '9', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: false},
    {id: '10', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: false},
    {id: '11', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: true},
    {id: '12', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: true},
    {id: '13', name: 'Anton\'s pack', cards: '4', lastUpdated: '18.02.2019', createdBy: 'Anton', actions: false},
    {id: '14', name: 'Artem\'s pack', cards: '7', lastUpdated: '09.04.2020', createdBy: 'Artem', actions: false},
    {id: '15', name: 'Siarhei\'s pack', cards: '1', lastUpdated: '21.01.2017', createdBy: 'Siarhei', actions: true},

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