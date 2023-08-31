import Button from "@mui/material/Button";
import {NavigateFunction, useParams} from "react-router-dom";
import {Player} from "../Models/Player.ts";
import Match from "./Match.tsx";
import {Tournament} from "../Models/Tournament.ts";
import React, {useState} from "react";
import "../CSS/TournamentBracket.css";
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
    user: string
};

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    const [score1, setScore1] = useState(propsTournamentBracket.match?.score1)
    const [player1, setPlayer1] = useState(propsTournamentBracket.match?.player1)
    const [score2, setScore2] = useState(propsTournamentBracket.match?.score2)
    const [player2, setPlayer2] = useState(propsTournamentBracket.match?.player2)
    const [champion, setChampion] = useState("");
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


    const handleChangeChampion = (event: SelectChangeEvent) => {
        setChampion(event.target.value);
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

    const handleSaveBracket = () => {
        if (selectedTournament) {
            const tournamentId = selectedTournament.id;

            const updatedMatches =
                selectedTournament.matches.map(match => ({
                    id: match.id,
                    player1: player1,
                    score1: score1,
                    player2: player2,
                    score2: score2
                }));
            axios.put("/api/cup/tournaments/" + tournamentId, {
                "admin": propsTournamentBracket.user,
                "tournamentName": selectedTournament.tournamentName,
                "location": selectedTournament.location,
                "numberOfPlayers": selectedTournament.numberOfPlayers,
                "matches": updatedMatches,
                "champion": champion,
            } as TournamentWithoutIdWithMatch)
                .then(() => propsTournamentBracket.allTournamentsList())
        }
    }

    const handleDeleteBracket = () => {
        axios.delete("/api/cup/tournaments/" + tournamentId,)
            .then(() => propsTournamentBracket.allTournamentsList())
            .then(() => propsTournamentBracket.navigate("/tournaments"))
    }

    return (
        <div>
            <div key={selectedTournament.id}>
                <h1 style={{color: "white"}}>{selectedTournament.tournamentName + " in " + selectedTournament.location + "🏆"} </h1>
                <div className="bracket-container">
                    {[...Array(numRounds)].map((_, roundIndex) => (
                        <div key={roundIndex} className="round">
                            <h4 style={{color: "white"}}>Round {roundIndex + 1}</h4>
                            <div className="round-matches">
                                {[...Array(totalBracketSize / Math.pow(2, roundIndex + 1))].map(
                                    (_, matchIndex) => (
                                        <div key={matchIndex}>
                                            <Match
                                                id={selectedTournament.matches[matchIndex].id}
                                                matchIndex={matchIndex}
                                                players={propsTournamentBracket.players}
                                                onScoreChange1={handleScoreChange1}
                                                onPlayerChange1={handlePlayerChange1}
                                                onScoreChange2={handleScoreChange2}
                                                onPlayerChange2={handlePlayerChange2}
                                                score1={score1}
                                                score2={score2}
                                                player1={player1}
                                                player2={player2}/>

                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                    {/* Winner's name input */}
                    <div className="winner-input">
                        <h1 style={{color: "gold"}}>Champion🏆</h1>
                        <FormControl sx={{m: 1, width: "70%"}}>
                            <InputLabel id="demo-simple-select-label" style={{color: 'gold'}}>Players</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={champion}
                                label="Player name"
                                onChange={handleChangeChampion}
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
                <div style={{display: "flex", flexDirection: "row", gap: "100px", justifyItems: "center"}}>
                    <Button
                        variant="contained"
                        onClick={() => propsTournamentBracket.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                        Home
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => propsTournamentBracket.navigate("/tournaments")}
                        sx={{fontSize: "10px", padding: "5px 50px", margin: "40px 0"}}>
                        Tournaments
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveBracket}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleDeleteBracket}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}