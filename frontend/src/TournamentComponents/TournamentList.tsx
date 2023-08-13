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
import {useState} from "react";


type PropsTournamentList = {

    navigate: NavigateFunction,
    tournaments: Tournament[],
    allTournamentList: () => void


}

export default function TournamentList(propsTournamentList: PropsTournamentList) {

    const [open, setOpen] = useState(false);
    const [visibilitySaveToAddNewTournamentButton, setVisibilitySaveToAddNewTournamentButton] = useState<boolean>(false)


    const handleClickOpen = () => {
        setVisibilitySaveToAddNewTournamentButton(true)

        setOpen(true)
    }
    const handleClickTournament = (tournament: Tournament) => {
        propsTournamentList.navigate(`/Bracket/${tournament.id}`);
    }


    return (
        <div>
            <h1 className="main-Title">Cup with me🏆</h1>
            <h2>Tournaments:</h2>
            <TableContainer component={Paper}>
                <Table sx={{width: '100%'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Location</TableCell>
                            <TableCell align="left">Number of Players</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {propsTournamentList.tournaments.map((tournament) => (
                            <TableRow
                                key={tournament.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => handleClickTournament(tournament)}
                            >
                                <TableCell align="left">{tournament.tournamentName}</TableCell>
                                <TableCell align="left">{tournament.location}</TableCell>
                                <TableCell align="left">{tournament.numberOfPlayers}</TableCell>
                                <TableCell>
                                    <Button variant="contained" sx={{padding: "5px 10px"}}>
                                        View Bracket
                                    </Button>
                                </TableCell>
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
                <Button variant="contained" onClick={() => propsTournamentList.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
                <Button variant="contained" onClick={() => propsTournamentList.navigate("/players")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Players
                </Button>
            </div>
            <NewTournamentModal visibilitySaveToAddNewTournamentButton={visibilitySaveToAddNewTournamentButton}

                                open={open} setOpen={setOpen}
                                allTournamentsList={propsTournamentList.allTournamentList}

            />

        </div>
    )
        ;
}


