import {Player} from "./Player.ts";
import "../App.css"
import axios from "axios";
import {useEffect, useState} from "react";
import PlayerTable from "./PlayerTable.tsx"
import Button from "@mui/material/Button";
import NewPlayerModal from "./NewPlayerModal.tsx";


export default function PlayerList() {

    const [players, setPlayers] = useState<Player[]>([])
    const [open, setOpen] = useState(false);


    function allPlayersList() {
        axios.get("/api/cup/players")
            .then(response => {

                setPlayers(response.data)

            })

    }

    useEffect(allPlayersList, [])

    const handleClickOpen = () => {
        setOpen(true)
    }
    return (
        <>
            <h1 className="main-Title">Cup with me🏆</h1>

            <PlayerTable players={players}/>
            <NewPlayerModal open={open} setOpen={setOpen}/>

            <Button variant="contained" onClick={handleClickOpen}>
                new player
            </Button>
        </>
    )
}


