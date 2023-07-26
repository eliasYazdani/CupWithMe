import "./PlayerColumn.css"
import {Player} from "./Player.ts";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


type PropsPlayerColumn ={
    players : Player[],

}
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

export default function PlayerColumn(propsPlayerColumn : PropsPlayerColumn) {





    return (
        <div className = "player-column-with-Title">
            <h2>Players:</h2>
        <div className = "player-column" style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={
                propsPlayerColumn.players}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
        {/*<div>
            <h2>Players:</h2>
            {
                propsPlayerColumn.players.map(player=><PlayerCard player={player} key={player.id} />)
            }
        </div>*/}
        </div>
    );
}

