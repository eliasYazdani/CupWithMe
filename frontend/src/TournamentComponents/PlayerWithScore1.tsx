import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Player} from "../Models/Player.ts";
import {SelectChangeEvent} from "@mui/material/Select";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";


type PropsPlayerWithScore1 = {
    players: Player[]
    onScoreChange1: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add the onScoreChange prop
    onPlayerChange1: (event: SelectChangeEvent) => void; // Add the onPlayerChange prop

}

export default function PlayerWithScore1(propsPlayerWithScore1: PropsPlayerWithScore1) {

    const [playerSelect1, setPlayerSelect1] = React.useState('');
    const [playerScore1, setPlayerScore1] = useState<number | ''>(''); // State to store the entered score


    const handleChangePlayer1 = (event: SelectChangeEvent) => {
        setPlayerSelect1(event.target.value);
        propsPlayerWithScore1.onPlayerChange1(event)
    };
    const handleChangeScore1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerScore1(parseInt(event.target.value));
        propsPlayerWithScore1.onScoreChange1(event);
    };

    return (
        <Box style={{display: 'flex', flexDirection: 'row'}}>
            <FormControl sx={{m: 1, width: "100%"}}>
                <InputLabel id="demo-simple-select-label">Players</InputLabel>
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
            />
        </Box>
    );
}


