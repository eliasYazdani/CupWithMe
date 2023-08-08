import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import {Tournament} from "../Models/Tournament.ts";
import {NavigateFunction} from "react-router-dom";
import Button from "@mui/material/Button";
import NewTournamentModal from "./NewTournamentModal.tsx";
import {useEffect, useState} from "react";
import axios from "axios";


type PropsTournamentTable = {

    navigate: NavigateFunction,


}

export default function TournamentList(propsTournamentTable: PropsTournamentTable) {
    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [open, setOpen] = useState(false);
    const [visibilitySaveToAddNewTournamentButton, setVisibilitySaveToAddNewTournamentButton] = useState<boolean>(false)

    function allTournamentsList() {
        axios.get("/api/cup/tournaments")
            .then(response => {
                setTournaments(response.data)
                console.log(response.data)
            })

    }

    useEffect(allTournamentsList, [])

    const handleClickOpen = () => {
        setVisibilitySaveToAddNewTournamentButton(true)

        setOpen(true)
    }


    return (
        <div>
            <h1 className="main-Title">Cup with me🏆</h1>
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
                        {tournaments.map((tournament) => (
                            <TableRow
                                key={tournament.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => propsTournamentTable.navigate("/Bracket")}

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
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="contained" onClick={handleClickOpen}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    new Tournament
                </Button>
                <Button variant="contained" onClick={() => propsTournamentTable.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
                <Button variant="contained" onClick={() => propsTournamentTable.navigate("/players")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Players
                </Button>
            </div>
            <NewTournamentModal visibilitySaveToAddNewTournamentButton={visibilitySaveToAddNewTournamentButton}

                                open={open} setOpen={setOpen}
                                allTournamentsList={allTournamentsList}

            />

        </div>
    )
        ;
}