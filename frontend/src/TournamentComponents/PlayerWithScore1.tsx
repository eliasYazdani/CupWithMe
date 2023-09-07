import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Player} from "../Models/Player.ts";
import {SelectChangeEvent} from "@mui/material/Select";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";


type PropsPlayerWithScore1 = {
    players: Player[]
    onScoreChange1: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add the onScoreChange prop
    onPlayerChange1: (event: SelectChangeEvent) => void; // Add the onPlayerChange prop
    score1: number | null | undefined;
    player1: string | undefined;

}

export default function PlayerWithScore1(propsPlayerWithScore1: PropsPlayerWithScore1) {

    const [playerScore1, setPlayerScore1] = useState<number | null | undefined>(propsPlayerWithScore1.score1);
    const [playerSelect1, setPlayerSelect1] = useState<string|undefined>(propsPlayerWithScore1.player1);


    const handleChangePlayer1 = (event: SelectChangeEvent) => {
        propsPlayerWithScore1.onPlayerChange1(event)
        setPlayerSelect1(propsPlayerWithScore1.player1);
    };
    const handleChangeScore1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        propsPlayerWithScore1.onScoreChange1(event);
        setPlayerScore1(propsPlayerWithScore1.score1);
    };

    return (
        <Box style={{display: 'flex', flexDirection: 'row'}}>
            <FormControl sx={{m: 1, width: "100%"}}>
                <InputLabel id="demo-simple-select-label" style={{color: 'white'}}>Players</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={playerSelect1}
                    label="Player name"
                    onChange={handleChangePlayer1}
                    autoWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {propsPlayerWithScore1.players.map((player) => (
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
                value={playerScore1 ?? ""}
                onChange={handleChangeScore1}
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


