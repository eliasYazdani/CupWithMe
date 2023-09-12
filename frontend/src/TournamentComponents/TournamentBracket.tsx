import Button from "@mui/material/Button";
import {NavigateFunction, useParams} from "react-router-dom";
import {Player} from "../Models/Player.ts";
import Match from "./Match.tsx";
import {Tournament} from "../Models/Tournament.ts";
import  {useState} from "react";
import "../CSS/TournamentBracket.css";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import {MatchModel} from "../Models/MatchModel.ts";
import axios from "axios";
import {TournamentWithoutIdWithMatch} from "../Models/TournamentWithoutIdWithMatch.ts";
import {Round} from "../Models/Round.ts";


type PropsTournamentBracket = {
    navigate: NavigateFunction;
    players: Player[];
    tournaments: Tournament[];
    match?: MatchModel;
    allTournamentsList: () => void
    user: string
    roundsToUpdate: Round[]
};

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    const [champion, setChampion] = useState("");
    const [updatedRounds, setUpdatedRounds] = useState([...propsTournamentBracket.roundsToUpdate]);
    const {tournamentId} = useParams();
    const selectedTournament = propsTournamentBracket.tournaments.find(
        (tournament) => tournament.id === tournamentId
    );

    if (!selectedTournament) {
        return <div>Loading or No Tournament Found</div>;
    }



    const handleChangeChampion = (event: SelectChangeEvent) => {
        setChampion(event.target.value);
    };

    const handleScoreChange1 = (
        roundIndex: number,
        matchIndex: number,
        score1: number | null|undefined,
    ) => {
        const updatedRoundsCopy = [...updatedRounds];
        updatedRoundsCopy[roundIndex].matches[matchIndex].score1 = score1;
        setUpdatedRounds(updatedRoundsCopy);
    };
    const handleScoreChange2 = (
        roundIndex: number,
        matchIndex: number,
        score2: number | null|undefined
    ) => {
        const updatedRoundsCopy = [...updatedRounds];
        updatedRoundsCopy[roundIndex].matches[matchIndex].score2 = score2;
        setUpdatedRounds(updatedRoundsCopy);
    };

    const handlePlayerChange1 = (
        roundIndex: number,
        matchIndex: number,
        player1: string|undefined,
    ) => {
        const updatedMatchesCopy = [...updatedRounds];
        updatedMatchesCopy[roundIndex].matches[matchIndex].player1 = player1;
        setUpdatedRounds(updatedMatchesCopy);
    };
    const handlePlayerChange2 = (
        roundIndex: number,
        matchIndex: number,
        player2: string|undefined
    ) => {
        const updatedMatchesCopy = [...updatedRounds];
        updatedMatchesCopy[roundIndex].matches[matchIndex].player2 = player2;
        setUpdatedRounds(updatedMatchesCopy);
    };

    const handleSaveBracket = () => {
        if (selectedTournament) {
            const tournamentId = selectedTournament.id;
            console.log("Sending data to the backend:", updatedRounds);
            console.log("Sending data to the backend:", champion);
            axios
                .put("/api/cup/tournaments/" + tournamentId, {
                    admin: propsTournamentBracket.user,
                    tournamentName: selectedTournament.tournamentName,
                    location: selectedTournament.location,
                    numberOfPlayers: selectedTournament.numberOfPlayers,
                    rounds: updatedRounds, // Send the updated rounds
                    champion: champion,
                } as TournamentWithoutIdWithMatch)
                .then(() => propsTournamentBracket.allTournamentsList());
        }
    };

    const handleDeleteBracket = () => {
        axios.delete("/api/cup/tournaments/" + tournamentId,)
            .then(() => propsTournamentBracket.allTournamentsList())
            .then(() => propsTournamentBracket.navigate("/tournaments"))
    }

    return (
        <div>
            <div key={selectedTournament.id}>
                <h1 style={{ color: "white" }}>
                    {selectedTournament.tournamentName +
                        " in " +
                        selectedTournament.location +
                        "🏆"}
                </h1>
                <div className="bracket-container">
                    {selectedTournament.rounds.map((round, roundIndex) => (
                        <div key={roundIndex} className="round">
                            <h4 style={{ color: "white" }}>Round {roundIndex + 1}</h4>
                            <div className="round-matches">
                                {round.matches.map((match, matchIndex) => (
                                    <div key={matchIndex}>
                                        <Match
                                            // Pass appropriate match data
                                            id={match.id}
                                            matchIndex={matchIndex}
                                            players={propsTournamentBracket.players}
                                            onScoreChange1={(event) => {
                                                const scoreValue = event?.target?.value;
                                                handleScoreChange1(roundIndex, matchIndex, parseInt(scoreValue));
                                            }}
                                            onPlayerChange1={(event) => {
                                                const playerValue = event?.target?.value;
                                                handlePlayerChange1(roundIndex, matchIndex, playerValue);
                                            }}
                                            onScoreChange2={(event) => {
                                                const scoreValue = event?.target?.value;
                                                handleScoreChange2(roundIndex, matchIndex, parseInt(scoreValue) );
                                            }}
                                            onPlayerChange2={(event) => {
                                                const playerValue = event?.target?.value;
                                                handlePlayerChange2(roundIndex, matchIndex, playerValue);
                                            }}
                                            score1={match.score1}
                                            score2={match.score2}
                                            player1={match.player1}
                                            player2={match.player2}

                                            />

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