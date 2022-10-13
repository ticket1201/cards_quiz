import * as React from 'react';
import {DataGrid, DataGridProps} from '@mui/x-data-grid';
import {GridInitialStateCommunity} from "@mui/x-data-grid/models/gridStateCommunity";
import {GridSortDirection, GridSortModel} from "@mui/x-data-grid/models/gridSortModel";
import {useAppDispatch} from "../../hooks/hooks";
import {setSortParamsAC} from "../../../features/SearchBar/search-reducer";
import {SortNameType} from "../../../features/SearchBar/search-constants";

type UniversalTablePropsType = DataGridProps & {
    sortName?: SortNameType
    sortParam?: string
}

const UniversalTable = ({
                            rows,
                            columns,
                            pageSize,
                            loading,
                            sortName,
                            sortParam,
                            ...restProps
                        }: UniversalTablePropsType) => {

    const dispatch = useAppDispatch()

    // set initial sorting state for the table
    let initialState: GridInitialStateCommunity = {}
    if (sortParam) {

        const field = sortParam.slice(1);
        const sortQuery = sortParam[0];
        let sort: GridSortDirection = null;

        if (sortQuery === '1')
            sort = 'asc'
        if (sortQuery === '0')
            sort = 'desc'

        initialState = {
            sorting: {
                sortModel: [
                    {field, sort}
                ]
            }
        }
    }

    const onSortModelChangeHandler = (model: GridSortModel) => {
        const field = model[0].field;
        const sort = model[0].sort;
        let sortQuery = undefined as string | undefined;

        if (sort === 'asc')
            sortQuery = '1' + field
        else if (sort === 'desc')
            sortQuery = '0' + field

        dispatch(setSortParamsAC(sortName, sortQuery))
    }

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
                onSortModelChange={onSortModelChangeHandler}
                initialState={initialState}
                getRowId={(row) => row._id}
                {...restProps}
            />
        </div>
    );
}

export default UniversalTable