import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Player} from "../Models/Player.ts";
import {SelectChangeEvent} from "@mui/material/Select";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";


type PropsPlayerWithScore2 = {
    players: Player[]
    onScoreChange2: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add the onScoreChange prop
    onPlayerChange2: (event: SelectChangeEvent) => void; // Add the onPlayerChange prop

}

export default function PlayerWithScore2(propsPlayerWithScore2: PropsPlayerWithScore2) {

    const [playerSelect2, setPlayerSelect2] = React.useState('');
    const [playerScore2, setPlayerScore2] = useState<number | ''>(''); // State to store the entered score


    const handleChangePlayer2 = (event: SelectChangeEvent) => {
        setPlayerSelect2(event.target.value);
        propsPlayerWithScore2.onPlayerChange2(event)
    };
    const handleChangeScore2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerScore2(parseInt(event.target.value));
        propsPlayerWithScore2.onScoreChange2(event);
    };

    return (
        <Box style={{display: 'flex', flexDirection: 'row'}}>
            <FormControl sx={{m: 1, width: "100%"}}>
                <InputLabel id="demo-simple-select-label">Players</InputLabel>
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
            />
        </Box>
    );
}


