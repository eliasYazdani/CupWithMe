import Button from "@mui/material/Button";
import {NavigateFunction, useParams} from "react-router-dom";
import {Player} from "../Models/Player.ts";
import Match from "./Match.tsx";
import {Tournament} from "../Models/Tournament.ts";
import React, {useEffect, useState} from "react";
import "./TournamentBracket.css";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import {MatchModel} from "../Models/MatchModel.ts";
import axios from "axios";
import {TournamentWithoutIdWithMatch} from "../Models/TournamentWithoutIdWithMatch.ts";


type PropsTournamentBracket = {
    navigate: NavigateFunction;
    players: Player[];
    tournaments: Tournament[];
    match?: MatchModel;
    allTournamentsList: () => void
};

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    const [score1, setScore1] = useState(propsTournamentBracket.match?.score1)
    const [player1, setPlayer1] = useState(propsTournamentBracket.match?.player1)
    const [score2, setScore2] = useState(propsTournamentBracket.match?.score2)
    const [player2, setPlayer2] = useState(propsTournamentBracket.match?.player2)
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


    const handleChangeWinner = (event: SelectChangeEvent) => {
        setWinnerName(event.target.value);
    };

    const handleScoreChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScore1(parseInt(event.target.value));
    };
    const handlePlayerChange1 = (event: SelectChangeEvent) => {
        setPlayer1(event.target.value);
    }
    const handleScoreChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScore2(parseInt(event.target.value));
    };
    const handlePlayerChange2 = (event: SelectChangeEvent) => {
        setPlayer2(event.target.value);
    }
    useEffect(() => {
        setPlayer1(propsTournamentBracket.match?.player1)
        setScore1(propsTournamentBracket.match?.score1)
        setPlayer2(propsTournamentBracket.match?.player2)
        setScore2(propsTournamentBracket.match?.score2)
    }, [propsTournamentBracket.match])
    const handleSaveBracket = () => {
        if (selectedTournament) {
            const tournamentId = selectedTournament.id;

            axios.put("/api/cup/tournaments/" + tournamentId, {
                "tournamentName": selectedTournament.tournamentName,
                "location": selectedTournament.location,
                "numberOfPlayers": selectedTournament.numberOfPlayers,
                "match": {
                    "id": selectedTournament.match.id,
                    "player1": player1,
                    "score1": score1,
                    "player2": player2,
                    "score2": score2
                }
            } as TournamentWithoutIdWithMatch)
                .then(() => propsTournamentBracket.allTournamentsList())


        }
    }

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
                                            <Match
                                                id={selectedTournament.match.id}
                                                matchIndex={matchIndex}
                                                players={propsTournamentBracket.players}
                                                onScoreChange1={handleScoreChange1}
                                                onPlayerChange1={handlePlayerChange1}
                                                onScoreChange2={handleScoreChange2}
                                                onPlayerChange2={handlePlayerChange2}/>

                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                    {/* Winner's name input */}
                    <div className="winner-input">
                        <h1>Winner🏆</h1>
                        <FormControl sx={{m: 1, width: "70%"}}>
                            <InputLabel id="demo-simple-select-label">Players</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={winnerName}
                                label="Player name"
                                onChange={handleChangeWinner}
                                autoWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {propsTournamentBracket.players.map((player) => (
                                    <MenuItem key={player.id}
                                              value={`${player.firstName} ${player.lastName}`}
                                    >{`${player.firstName} ${player.lastName}`}</MenuItem>
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
                    <Button
                        variant="contained"
                        onClick={handleSaveBracket} // Call the handleSave function when the button is clicked
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}