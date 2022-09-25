import * as React from 'react';
import {DataGrid, DataGridProps} from '@mui/x-data-grid';

/*type UniversalTablePropsType = {
    rows: any[]
    columns: GridColDef[]
    pageSize: number
    loading?: boolean
}*/

const UniversalTable = ({rows, columns, pageSize, loading, ...restProps}: DataGridProps) => {
    return (
        <div style={{height: 500, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                density={'comfortable'}
                disableColumnMenu={true}
                // disableColumnFilter={true}
                // autoPageSize
                // disableExtendRowFullWidth
                // rowsPerPageOptions={[5, 25]}
                loading={loading}
                {...restProps}
            />
        </div>
    );
}

export default UniversalTable