import {Player} from "../Models/Player.ts";
import PlayerWithScore1 from "./PlayerWithScore1.tsx";
import PlayerWithScore2 from "./PlayerWithScore2.tsx";
import {SelectChangeEvent} from "@mui/material/Select";
import React from "react";

type PropsMatch = {
    id: string
    matchIndex: number; // Add the matchIndex prop
    players: Player[];
    onScoreChange1: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onScoreChange2: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPlayerChange1: (event: SelectChangeEvent) => void
    onPlayerChange2: (event: SelectChangeEvent) => void
    score1: number | null | undefined;
    score2: number | null | undefined;
    player1: string | undefined;
    player2: string | undefined;
};
export default function Match(propsMatch: PropsMatch) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', margin: 'auto'}}>
            <PlayerWithScore1
                players={propsMatch.players}
                onScoreChange1={propsMatch.onScoreChange1}
                onPlayerChange1={propsMatch.onPlayerChange1}
                score1={propsMatch.score1}
                player1={propsMatch.player1}
            />
            <PlayerWithScore2
                players={propsMatch.players}
                onScoreChange2={propsMatch.onScoreChange2}
                onPlayerChange2={propsMatch.onPlayerChange2}
                score2={propsMatch.score2}
                player2={propsMatch.player2}
            />
        </div>
    );
}

