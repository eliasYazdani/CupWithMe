import Button from "@mui/material/Button";
import {NavigateFunction} from "react-router-dom";

import {Player} from "../Models/Player.ts";
import Match from "./Match.tsx";
import {Tournament} from "../Models/Tournament.ts";

type PropsTournamentBracket = {

    navigate: NavigateFunction
    players: Player[]
    tournaments: Tournament[]

}

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    return (
        <div>
            <h3>Bracket</h3>
            {propsTournamentBracket.tournaments.map((tournament) => (
                <div key={tournament.id}>
                    {[...Array(Math.floor(tournament.numberOfPlayers / 2))].map((_, index) => (
                        <Match key={index} players={propsTournamentBracket.players}/>
                    ))}
                </div>
            ))}
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