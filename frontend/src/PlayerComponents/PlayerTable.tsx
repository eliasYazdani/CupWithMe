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
    allPlayersList: () => void
}

export default function PlayerTable(propsPlayerTable: PropsPlayerTable) {
    const [selectedPlayer, setSelectedPlayer] = useState<Player>()
    const [open, setOpen] = useState(false)
    const [visibilitySaveToAddNewPlayerButton, setVisibilitySaveToAddNewPlayerButton] = useState<boolean>(false)
    const [visibilitySaveChangePlayerButton, setVisibilitySaveToChangePlayerButton] = useState<boolean>(false)
    const [visibilityDeletePlayerButton, setVisibilityDeletePlayerButton] = useState<boolean>(false)


    return (
        <div>
            <h2>Players:</h2>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">First name</TableCell>
                            <TableCell align="left">Last name</TableCell>
                            <TableCell align="left">Age</TableCell>
                            <TableCell align="right">ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {propsPlayerTable.players.map((player) => (
                            <TableRow
                                key={player.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => {
                                    setVisibilityDeletePlayerButton(true)
                                    setVisibilitySaveToAddNewPlayerButton(false)
                                    setVisibilitySaveToChangePlayerButton(true)
                                    setOpen(true)
                                    setSelectedPlayer(player)
                                }}
                            >
                                <TableCell align="left">{player.firstName}</TableCell>
                                <TableCell align="left">{player.lastName}</TableCell>
                                <TableCell align="left">{player.age}</TableCell>
                                <TableCell align="right" component="th" scope="row">{player.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <NewPlayerModal visibilitySaveToAddNewPlayerButton={visibilitySaveToAddNewPlayerButton}
                            visibilitySaveToChangePlayerButton={visibilitySaveChangePlayerButton}
                            visibilityDeletePlayerButton={visibilityDeletePlayerButton}
                            open={open} setOpen={setOpen}
                            allPlayersList={propsPlayerTable.allPlayersList}
                            player={selectedPlayer}/>
        </div>
    );
}
