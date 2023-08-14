import Button from "@mui/material/Button";
import {NavigateFunction, useParams} from "react-router-dom";
import {Player} from "../Models/Player.ts";
import Match from "./Match.tsx";
import {Tournament} from "../Models/Tournament.ts";
import {useState} from "react";
import "./TournamentBracket.css";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";


type PropsTournamentBracket = {
    navigate: NavigateFunction;
    players: Player[];
    tournaments: Tournament[];
};

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    const [winnerName, setWinnerName] = useState("");
    const {tournamentId} = useParams();
    const selectedTournament = propsTournamentBracket.tournaments.find(
        (tournament) => tournament.id === tournamentId
    );

    if (!selectedTournament) {
        return <div>Loading or No Tournament Found</div>;
    }

    const numPlayers = selectedTournament.numberOfPlayers;
    const numRounds = Math.ceil(Math.log2(numPlayers));
    const totalBracketSize = Math.pow(2, Math.ceil(Math.log2(numPlayers)));


    const handleChange = (event: SelectChangeEvent) => {
        setWinnerName(event.target.value as string);
    };

    return (
        <div>
            <div key={selectedTournament.id}>
                <h1>{selectedTournament.tournamentName}</h1>
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
                    {/* Winner's name input */}
                    <div className="winner-input">
                        <h1>Winner🏆</h1>
                        <FormControl sx={{m: 1, width: "10%"}}>
                            <InputLabel id="demo-simple-select-label">Players</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={winnerName}
                                label="Player name"
                                onChange={handleChange}
                                autoWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {propsTournamentBracket.players.map((player) => (
                                    <MenuItem key={player.id}
                                              value={`${player.firstName} ${player.lastName}`}>{`${player.firstName} ${player.lastName}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
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
