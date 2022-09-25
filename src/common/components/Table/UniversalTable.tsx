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
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                density={'comfortable'}
                disableColumnMenu={true}
                // autoHeight
                // disableColumnFilter={true}
                // autoPageSize
                rowsPerPageOptions={[5, 10, 25, 50, 100, 8]}
                rowSpacingType={'margin'}
                // pageSize={5}
                loading={loading}
                {...restProps}
            />
        </div>
    );
}

export default UniversalTable