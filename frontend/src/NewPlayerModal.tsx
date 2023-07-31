import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useState} from "react";
import axios from "axios";
import {Player} from "./Player.ts";


type PropsPlayerModal = {
    onSaveNewPlayer: () => void
}
export default function NewPlayerModal(propsPlayerModal: PropsPlayerModal) {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState(0)

    function changeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value)
    }

    function changeLastName(event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value)
    }

    function changeAge(event: React.ChangeEvent<HTMLInputElement>) {
        setAge(parseInt(event.target.value))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFirstName("")
        setLastName("")
        setAge(0)
        setOpen(false);
    };
    const handleSave = () => {
        setFirstName("")
        setLastName("")
        setAge(0)

        axios.post("/api/cup/players", {
            "firstName": firstName,
            "lastName": lastName,
            "age": age,
        } as Player)
            .then(propsPlayerModal.onSaveNewPlayer)

        setOpen(false);
    }


    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                new player
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>➕Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Give player info like First name,Last name and age.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={firstName}
                        label="First name"
                        type="text"
                        onInput={changeFirstName}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={lastName}
                        label="Last name"
                        type="text"
                        onInput={changeLastName}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={age}
                        label="Age"
                        type="number"
                        onInput={changeAge}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}