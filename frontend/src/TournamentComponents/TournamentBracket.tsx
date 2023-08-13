import Button from "@mui/material/Button";
import {NavigateFunction, useParams} from "react-router-dom";

import {Player} from "../Models/Player.ts";
import Match from "./Match.tsx";
import {Tournament} from "../Models/Tournament.ts";

type PropsTournamentBracket = {

    navigate: NavigateFunction
    players: Player[]
    tournaments: Tournament[]


}

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    const {tournamentId} = useParams(); // Access the tournamentId from route parameters
    const selectedTournament = propsTournamentBracket.tournaments.find((tournament) => tournament.id === tournamentId);


    return (
        <div>
            {selectedTournament && (
                <div key={selectedTournament.id}>
                    <h3>{selectedTournament.tournamentName}</h3>
                    {[...Array(Math.floor(selectedTournament.numberOfPlayers / 2))].map((_, index) => (
                        <Match key={index} players={propsTournamentBracket.players}/>
                    ))}
                </div>
            )}
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="contained" onClick={() => propsTournamentBracket.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
                <Button variant="contained" onClick={() => propsTournamentBracket.navigate("/tournaments")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Tournaments
                </Button>
            </div>
        </div>
    )
}