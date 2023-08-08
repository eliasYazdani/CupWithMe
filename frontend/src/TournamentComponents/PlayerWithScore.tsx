import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Player} from "../Models/Player.ts";
import {SelectChangeEvent} from "@mui/material/Select";
import React from "react";
import TextField from "@mui/material/TextField";


type PropsPlayerWithScore = {
    players: Player[]


}

export default function PlayerWithScore(propsPlayerWithScore: PropsPlayerWithScore) {


    const [playerSelect, setPlayerSelect] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setPlayerSelect(event.target.value as string);
    };

    return (
        <Box style={{display: 'flex', flexDirection: 'row'}}>
            <FormControl sx={{m: 1, width: "10%"}}>
                <InputLabel id="demo-simple-select-label">Players</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={playerSelect}
                    label="Player name"
                    onChange={handleChange}
                    autoWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {propsPlayerWithScore.players.map((player) => (
                        <MenuItem key={player.id}
                                  value={`${player.firstName} ${player.lastName}`}>{`${player.firstName} ${player.lastName}`}</MenuItem>
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
            />
        </Box>
    );
}


// value={`${player.firstName} ${player.lastName}`}                    >                        {`${player.firstName} ${player.lastName}`}