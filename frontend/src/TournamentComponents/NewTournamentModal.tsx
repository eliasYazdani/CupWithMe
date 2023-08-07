import React, {useState} from 'react';
import {Tournament} from "./Tournament.ts";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import axios from "axios";


type PropsNewTournamentModal = {
    open: boolean
    setOpen: (value: boolean) => void
    tournament?: Tournament,
    visibilitySaveToAddNewTournamentButton: boolean,
    allTournamentsList: () => void

}

export default function NewTournamentModal(propsNewTournamentModal: PropsNewTournamentModal) {
    const [tournamentName, setTournamentName] = useState(propsNewTournamentModal.tournament?.tournamentName)
    const [location, setLocation] = useState(propsNewTournamentModal.tournament?.location)
    const [numberOfPlayers, setNumberOfPlayers] = useState(propsNewTournamentModal.tournament?.numberOfPlayers)


    const handleClose = () => {
        setTournamentName("")
        setLocation("")
        setNumberOfPlayers(0)
        propsNewTournamentModal.setOpen(false)
    }

    function changeTournamentName(event: React.ChangeEvent<HTMLInputElement>) {
        setTournamentName(event.target.value)
    }

    function changeLocation(event: React.ChangeEvent<HTMLInputElement>) {
        setLocation(event.target.value)
    }

    function changeNumberOfPlayers(event: React.ChangeEvent<HTMLInputElement>) {
        setNumberOfPlayers(parseInt(event.target.value))
    }

    const handleSaveNewTournament = () => {
        setTournamentName("")
        setLocation("")
        setNumberOfPlayers(0)

        axios.post("/api/cup/tournaments", {
            "tournamentName": tournamentName,
            "location": location,
            "numberOfPlayers": numberOfPlayers,
        } as Tournament)
            .then(() => propsNewTournamentModal.allTournamentsList())
            .then(() => propsNewTournamentModal.setOpen(false))
    }


    return (
        <div><Dialog open={propsNewTournamentModal.open} onClose={handleClose}>
            <DialogTitle>Tournament information:</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Give Tournament information like name,Location and Number of players.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="tournament"
                    value={tournamentName}
                    label="Tournament name"
                    type="text"
                    onInput={changeTournamentName}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="tournament"
                    value={location}
                    label="Location"
                    type="text"
                    onInput={changeLocation}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="tournament"
                    value={numberOfPlayers}
                    label="Number of players"
                    type="number"
                    onInput={changeNumberOfPlayers}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>Cancel</Button>
                {propsNewTournamentModal.visibilitySaveToAddNewTournamentButton && (
                    <Button variant="contained" onClick={handleSaveNewTournament}
                            sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>Save</Button>)}

            </DialogActions>
        </Dialog></div>
    );
}
