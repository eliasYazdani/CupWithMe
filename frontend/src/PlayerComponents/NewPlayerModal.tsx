import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Player} from "./Player.ts";


type PropsPlayerModal = {

    open: boolean
    setOpen: (value: boolean) => void
    player?: Player
    visibilitySaveToAddNewPlayer: boolean
    visibilitySaveToChangePlayer: boolean
}
export default function NewPlayerModal(propsPlayerModal: PropsPlayerModal) {
    const [firstName, setFirstName] = useState(propsPlayerModal.player?.firstName)
    const [lastName, setLastName] = useState(propsPlayerModal.player?.lastName)
    const [age, setAge] = useState(propsPlayerModal.player?.age)

    function changeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value)
    }

    function changeLastName(event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value)
    }

    function changeAge(event: React.ChangeEvent<HTMLInputElement>) {
        setAge(parseInt(event.target.value))
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

    };
    const handleSaveNewPlayer = () => {
        setFirstName("")
        setLastName("")
        setAge(0)

        axios.post("/api/cup/players", {
            "firstName": firstName,
            "lastName": lastName,
            "age": age,
        } as Player)


        propsPlayerModal.setOpen(false)
    }
    const handleSaveChange=()=>{
        axios.put("/api/cup/players/" + propsPlayerModal.player?.id, {
            "firstName": firstName,
            "lastName": lastName,
            "age": age,
        } as Player).then(response => {

            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setAge(response.data.age)

        })
        propsPlayerModal.setOpen(false)
        }




    return (
        <div>

            <Dialog open={propsPlayerModal.open} onClose={handleClose}>
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
                    {propsPlayerModal.visibilitySaveToAddNewPlayer && (
                        <Button onClick={handleSaveNewPlayer}>Save</Button>)}
                    {propsPlayerModal.visibilitySaveToChangePlayer && (
                        <Button onClick={handleSaveChange}>Save</Button>)}

                </DialogActions>
            </Dialog>
        </div>
    );
}