import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Player} from "../Models/Player.ts";
import {red} from "@mui/material/colors";


type PropsPlayerModal = {

    open: boolean
    setOpen: (value: boolean) => void
    player?: Player;
    visibilitySaveToAddNewPlayerButton: boolean
    visibilitySaveToChangePlayerButton: boolean
    visibilityDeletePlayerButton: boolean
    allPlayersList: () => void

}
export default function NewPlayerModal(propsPlayerModal: PropsPlayerModal) {
    const [firstName, setFirstName] = useState(propsPlayerModal.player?.firstName)
    const [lastName, setLastName] = useState(propsPlayerModal.player?.lastName)
    const [age, setAge] = useState(propsPlayerModal.player?.age)
    const [errorTextFirstName, setErrorTextFirstName] = useState<string>("")
    const [errorTextLastName, setErrorTextLastName] = useState<string>("")
    const [errorTextAge, setErrorTextAge] = useState<string>("")

    function changeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value)
        if (event.target.value == "") {
            setErrorTextFirstName("Please enter your First name.")
        } else {
            setErrorTextFirstName("")
        }

    }

    function changeLastName(event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value)
        if (event.target.value == "") {
            setErrorTextLastName("Please enter a your Last name.")
        } else {
            setErrorTextLastName("")
        }
    }

    function changeAge(event: React.ChangeEvent<HTMLInputElement>) {
        setAge(parseInt(event.target.value))
        if (parseInt(event.target.value) < 1) {
            setErrorTextAge("Please enter a valid age.")
        } else {
            setErrorTextAge("")
        }
    }

    useEffect(() => {
        setFirstName(propsPlayerModal.player?.firstName)
        setLastName(propsPlayerModal.player?.lastName)
        setAge(propsPlayerModal.player?.age)
    }, [propsPlayerModal.player])

    const handleClose = () => {
        setFirstName("")
        setLastName("")
        setAge(0)
        propsPlayerModal.setOpen(false)
    }
    const handleSaveNewPlayer = () => {
        setFirstName("")
        setLastName("")
        setAge(0)
        if (firstName !== "" && lastName !== "" && age !== undefined && age > 0) {
            axios.post("/api/cup/players", {
                "firstName": firstName,
                "lastName": lastName,
                "age": age,
            } as Player)
                .then(() => propsPlayerModal.allPlayersList())
                .then(() => propsPlayerModal.setOpen(false))
        }
    }

    const handleSaveChange = () => {
        if (firstName !== "" && lastName !== "" && age !== undefined && age > 0) {
            axios.put("/api/cup/players/" + propsPlayerModal.player?.id, {
                "firstName": firstName,
                "lastName": lastName,
                "age": age,
            } as Player)
                .then(() => propsPlayerModal.allPlayersList())
                .then(() => propsPlayerModal.setOpen(false))
        }
        setFirstName("")
        setLastName("")
        setAge(0)
    }

    const handleDelete = () => {
        axios.delete("/api/cup/players/" + propsPlayerModal.player?.id,)
            .then(() => propsPlayerModal.allPlayersList())
            .then(() => propsPlayerModal.setOpen(false))
    }


    return (
        <div>

            <Dialog open={propsPlayerModal.open} onClose={handleClose}
                    PaperProps={{style: {backgroundColor: 'lightgreen'}}}>
                <DialogTitle>Player information:</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Give player information like First name,Last name and Age.
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
                    <p style={{color: red[500]}}>{errorTextFirstName}</p>
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
                    <p style={{color: red[500]}}>{errorTextLastName}</p>

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
                    <p style={{color: red[500]}}>{errorTextAge}</p>
                </DialogContent>
                <DialogActions>
                    {propsPlayerModal.visibilityDeletePlayerButton && (
                        <Button variant="contained" onClick={handleDelete}
                                sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>Delete </Button>)}
                    <Button variant="contained" onClick={handleClose}
                            sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>Cancel</Button>
                    {propsPlayerModal.visibilitySaveToAddNewPlayerButton && (
                        <Button variant="contained" onClick={handleSaveNewPlayer}
                                sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>Save</Button>)}
                    {propsPlayerModal.visibilitySaveToChangePlayerButton && (
                        <Button variant="contained" onClick={handleSaveChange}
                                sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>Save</Button>)}
                </DialogActions>
            </Dialog>
        </div>
    );
}