import * as React from 'react';
import {DataGrid, DataGridProps} from '@mui/x-data-grid';


const UniversalTable = ({rows, columns, pageSize, loading, ...restProps}: DataGridProps) => {

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                density={'comfortable'}
                disableColumnMenu={true}
                sortingOrder={['desc', 'asc']}
                // disableExtendRowFullWidth={false}
                // autoHeight
                // disableColumnFilter={true}
                // autoPageSize
                // rowsPerPageOptions={[10]}
                pageSize={pageSize}
                rowSpacingType={'margin'}
                // pageSize={5}
                loading={loading}
                {...restProps}
                // onPageSizeChange={onPageSizeChangeHandler}
            />
        </div>
    );
}

export default UniversalTable