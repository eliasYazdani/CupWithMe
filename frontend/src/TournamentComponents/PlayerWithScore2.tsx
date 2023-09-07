import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Player} from "../Models/Player.ts";
import {SelectChangeEvent} from "@mui/material/Select";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";


type PropsPlayerWithScore2 = {
    players: Player[]
    onScoreChange2: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add the onScoreChange prop
    onPlayerChange2: (event: SelectChangeEvent) => void; // Add the onPlayerChange prop
    score2: number | null | undefined;
    player2: string | undefined;

}

export default function PlayerWithScore2(propsPlayerWithScore2: PropsPlayerWithScore2) {

    const [playerScore2, setPlayerScore2] = useState<number | null | undefined>(propsPlayerWithScore2.score2);
    const [playerSelect2, setPlayerSelect2] = useState<string|undefined>(propsPlayerWithScore2.player2);


    const handleChangePlayer2 = (event: SelectChangeEvent) => {
        propsPlayerWithScore2.onPlayerChange2(event)
        setPlayerSelect2(propsPlayerWithScore2.player2);
    };
    const handleChangeScore2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        propsPlayerWithScore2.onScoreChange2(event);
        setPlayerScore2(propsPlayerWithScore2.score2);
    };

    return (
        <Box style={{display: 'flex', flexDirection: 'row'}}>
            <FormControl sx={{m: 1, width: "100%"}}>
                <InputLabel id="demo-simple-select-label" style={{color: 'white'}}>Players</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={playerSelect2}
                    label="Player name"
                    onChange={handleChangePlayer2}
                    autoWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {propsPlayerWithScore2.players.map((player) => (
                        <MenuItem key={player.id}
                                  value={`${player.firstName} ${player.lastName}`}
                        >{`${player.firstName} ${player.lastName}`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                autoFocus
                margin="normal"
                id="score"
                label="Score"
                type="number"
                variant="standard"
                value={playerScore2 ?? ""}
                onChange={handleChangeScore2}
                sx={{
                    color: 'white', // Text color for input field
                    '& input::placeholder': {
                        color: 'white', // Color of the placeholder text
                    },
                    '& .MuiInputBase-input': {
                        '&::before': {
                            borderColor: 'white', // Color of the outline before input
                        },
                        '&::after': {
                            borderColor: 'white', // Color of the outline after input
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white', // Color of the label (placeholder)
                    },
                }}
            />
        </Box>
    );
}


