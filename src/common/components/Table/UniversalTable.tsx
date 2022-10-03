import * as React from 'react';
import {DataGrid, DataGridProps} from '@mui/x-data-grid';


const UniversalTable = ({
                            rows,
                            columns,
                            pageSize,
                            loading,
                            onSortModelChange,
                            initialState,
                            ...restProps
                        }: DataGridProps) => {

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                density={'comfortable'}
                disableColumnMenu={true}
                sortingOrder={['desc', 'asc']}
                disableSelectionOnClick
                hideFooter
                pageSize={pageSize}
                rowSpacingType={'margin'}
                loading={loading}
                onSortModelChange={onSortModelChange}
                initialState={initialState}
                getRowId={(row)=>row._id}
                {...restProps}
            />
        </div>
    );
}

export default UniversalTable