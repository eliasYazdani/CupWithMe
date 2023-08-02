import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Player} from "./Player.ts";

import {useState} from "react";
import NewPlayerModal from "./NewPlayerModal.tsx";


type PropsPlayerTable = {
    players: Player[],



}
export default function PlayerTable(propsPlayerTable: PropsPlayerTable) {
    const [selectedPlayer, setSelectedPlayer] = useState<Player>()
    const [open, setOpen] = useState(false)
    const [visibilitySaveToAddNewPlayer, setVisibilitySaveToAddNewPlayer] = useState<boolean>(false)
    const [visibilitySaveChangePlayer, setVisibilitySaveToChangePlayer] = useState<boolean>(false)

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
                        {propsPlayerTable.players.map((player) => (
                            <TableRow
                                key={player.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => {
                                    setVisibilitySaveToAddNewPlayer(false)
                                    setVisibilitySaveToChangePlayer(true)
                                    setOpen(true)
                                    setSelectedPlayer(player)
                                }}

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
            <NewPlayerModal visibilitySaveToAddNewPlayer={visibilitySaveToAddNewPlayer}
                            visibilitySaveToChangePlayer={visibilitySaveChangePlayer} open={open} setOpen={setOpen}
                            player={selectedPlayer}/>
        </div>
    );
}
