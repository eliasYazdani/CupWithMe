import Button from "@mui/material/Button";
import {NavigateFunction, useParams} from "react-router-dom";

import {Player} from "../Models/Player.ts";
import Match from "./Match.tsx";
import {Tournament} from "../Models/Tournament.ts";
import "./TournamentBracket.css";


type PropsTournamentBracket = {

    navigate: NavigateFunction
    players: Player[]
    tournaments: Tournament[]


}

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    const {tournamentId} = useParams(); // Access the tournamentId from route parameters
    const selectedTournament = propsTournamentBracket.tournaments.find((tournament) => tournament.id === tournamentId);

    if (!selectedTournament) {
        return <div>Loading or No Tournament Found</div>; // Handle the case where selectedTournament is undefined
    }
    const numPlayers = selectedTournament.numberOfPlayers;
    const numRounds = Math.ceil(Math.log2(numPlayers));
    const totalBracketSize = Math.pow(2, Math.ceil(Math.log2(numPlayers)));
    return (
        <div>
            <div key={selectedTournament.id}>
                <h3>{selectedTournament.tournamentName}</h3>
                <div className="bracket-container">
                    {[...Array(numRounds)].map((_, roundIndex) => (
                        <div key={roundIndex} className="round">
                            <h4>Round {roundIndex + 1}</h4>
                            <div className="round-matches">
                                {[...Array(totalBracketSize / Math.pow(2, roundIndex + 1))].map(
                                    (_, matchIndex) => (
                                        <div key={matchIndex} className="match">
                                            <Match players={propsTournamentBracket.players}/>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                    <Button
                        variant="contained"
                        onClick={() => propsTournamentBracket.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}
                    >
                        Home
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => propsTournamentBracket.navigate("/tournaments")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}
                    >
                        Tournaments
                    </Button>
                </div>
            </div>
        </div>
    );
}