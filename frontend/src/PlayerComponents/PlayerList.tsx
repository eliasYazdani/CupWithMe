import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Player} from "../Models/Player.ts";
import {useState} from "react";
import NewPlayerModal from "./NewPlayerModal.tsx";
import Button from "@mui/material/Button";
import {NavigateFunction} from "react-router-dom";


type PropsPlayerList = {
    navigate: NavigateFunction
    players: Player[],
    allPlayerList: () => void
    user:string
}

export default function PlayerList(propsPlayerList: PropsPlayerList) {
    const [selectedPlayer, setSelectedPlayer] = useState<Player>()
    const [open, setOpen] = useState(false)
    const [visibilitySaveToAddNewPlayerButton, setVisibilitySaveToAddNewPlayerButton] = useState<boolean>(false)
    const [visibilitySaveChangePlayerButton, setVisibilitySaveToChangePlayerButton] = useState<boolean>(false)
    const [visibilityDeletePlayerButton, setVisibilityDeletePlayerButton] = useState<boolean>(false)

    const handleClickOpen = () => {
        setVisibilitySaveToAddNewPlayerButton(true)
        setVisibilitySaveToChangePlayerButton(false)
        setVisibilityDeletePlayerButton(false)
        setOpen(true)
    }
    return (
        <div>
            <h1 className="main-Title">Cup with me🏆</h1>
            <h2 style={{color: "white"}}>Players</h2>
            <TableContainer component={Paper}>
                <Table sx={{width: "100%", backgroundColor: "lightgreen", margin: "0px 0px"}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">First name</TableCell>
                            <TableCell align="left">Last name</TableCell>
                            <TableCell align="left">Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {propsPlayerList.players.map((player) => (
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="contained" onClick={handleClickOpen}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    new player
                </Button>
                <Button variant="contained" onClick={() => propsPlayerList.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
                <Button variant="contained" onClick={() => propsPlayerList.navigate("/tournaments")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Tournaments
                </Button>
            </div>
            <NewPlayerModal visibilitySaveToAddNewPlayerButton={visibilitySaveToAddNewPlayerButton}
                            visibilitySaveToChangePlayerButton={visibilitySaveChangePlayerButton}
                            visibilityDeletePlayerButton={visibilityDeletePlayerButton}
                            open={open} setOpen={setOpen}
                            allPlayersList={propsPlayerList.allPlayerList}
                            user={propsPlayerList.user}
            />
            <NewPlayerModal visibilitySaveToAddNewPlayerButton={visibilitySaveToAddNewPlayerButton}
                            visibilitySaveToChangePlayerButton={visibilitySaveChangePlayerButton}
                            visibilityDeletePlayerButton={visibilityDeletePlayerButton}
                            open={open} setOpen={setOpen}
                            allPlayersList={propsPlayerList.allPlayerList}
                            user={propsPlayerList.user}
                            player={selectedPlayer}/>
        </div>
    );
}
