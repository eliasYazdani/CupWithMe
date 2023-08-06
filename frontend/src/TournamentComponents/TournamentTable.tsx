import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import {Tournament} from "./Tournament.ts";


type PropsTournamentTable = {
    tournaments: Tournament[],

}

export default function TournamentTable(PropsTournamentTable: PropsTournamentTable) {


    return (
        <div>
            <h2>Tournaments:</h2>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Location</TableCell>
                            <TableCell align="left">Number of Players</TableCell>
                            <TableCell align="right">ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {PropsTournamentTable.tournaments.map((tournament) => (
                            <TableRow
                                key={tournament.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}

                            >
                                <TableCell align="left">{tournament.tournamentName}</TableCell>
                                <TableCell align="left">{tournament.location}</TableCell>
                                <TableCell align="left">{tournament.numberOfPlayers}</TableCell>
                                <TableCell align="right" component="th" scope="row">{tournament.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}