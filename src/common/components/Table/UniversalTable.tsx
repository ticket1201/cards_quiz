import * as React from 'react';
import {DataGrid, DataGridProps} from '@mui/x-data-grid';

/*type UniversalTablePropsType = {
    rows: any[]
    columns: GridColDef[]
    pageSize: number
    loading?: boolean
}*/

const UniversalTable = ({rows, columns, pageSize, loading, ...restProps}: DataGridProps) => {


    const onPageSizeChangeHandler = (size: number) => {
        console.log(size)
        pageSize = size
    }

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                density={'comfortable'}
                disableColumnMenu={true}
                // disableExtendRowFullWidth={false}
                // autoHeight
                // disableColumnFilter={true}
                // autoPageSize
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                // pageSize={pageSize}
                rowSpacingType={'margin'}
                // pageSize={5}
                loading={loading}
                {...restProps}
                onPageSizeChange={onPageSizeChangeHandler}
            />
        </div>
    );
}

export default UniversalTable