import {Player} from "../Models/Player.ts";
import PlayerWithScore1 from "./PlayerWithScore1.tsx";
import PlayerWithScore2 from "./PlayerWithScore2.tsx";
import {SelectChangeEvent} from "@mui/material/Select";

type PropsMatch = {
    id: string
    matchIndex: number; // Add the matchIndex prop
    players: Player[];
    onScoreChange1: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onScoreChange2: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPlayerChange1: (event: SelectChangeEvent) => void
    onPlayerChange2: (event: SelectChangeEvent) => void
};
export default function Match(propsMatch: PropsMatch) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', margin: 'auto'}}>
            <PlayerWithScore1
                players={propsMatch.players}
                onScoreChange1={propsMatch.onScoreChange1} // Pass the matchIndex along with player and score
                onPlayerChange1={propsMatch.onPlayerChange1}
            />
            <PlayerWithScore2
                players={propsMatch.players}
                onScoreChange2={propsMatch.onScoreChange2} // Pass the matchIndex along with player and score
                onPlayerChange2={propsMatch.onPlayerChange2}
            />
        </div>
    );
}

