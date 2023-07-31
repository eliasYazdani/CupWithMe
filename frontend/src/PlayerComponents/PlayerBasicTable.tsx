import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Player} from "./Player.ts";
import NewPlayerModal from "./NewPlayerModal.tsx";


type PropsPlayerBasicTable = {
    players: Player[],
    onSavePlayer: () => void;
    handleClickOpen:() => void;
}
export default function PlayerBasicTable(propsPlayerBasicTable: PropsPlayerBasicTable) {

    return (
        <div>
            <h2>Players:</h2>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="center">First name</TableCell>
                            <TableCell align="center">Lastname</TableCell>
                            <TableCell align="center">Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {propsPlayerBasicTable.players.map((player) => (
                            <TableRow
                                key={player.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={propsPlayerBasicTable.handleClickOpen}
                            >
                                <TableCell component="th" scope="row">{player.id}</TableCell>
                                <TableCell align="center">{player.firstName}</TableCell>
                                <TableCell align="center">{player.lastName}</TableCell>
                                <TableCell align="center">{player.age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <NewPlayerModal onSaveNewPlayer={propsPlayerBasicTable.onSavePlayer}/>
        </div>
    );
}