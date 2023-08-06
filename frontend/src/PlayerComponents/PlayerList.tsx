import {Player} from "./Player.ts";
import "../App.css"
import axios from "axios";
import {useEffect, useState} from "react";
import PlayerTable from "./PlayerTable.tsx"
import Button from "@mui/material/Button";
import NewPlayerModal from "./NewPlayerModal.tsx";
import {NavigateFunction} from "react-router-dom";

type PropsPlayerList = {

    navigate: NavigateFunction
}


export default function PlayerList(propsPlayerList: PropsPlayerList) {

    const [players, setPlayers] = useState<Player[]>([])
    const [open, setOpen] = useState(false);
    const [visibilitySaveToAddNewPlayerButton, setVisibilitySaveToAddNewPlayerButton] = useState<boolean>(false)
    const [visibilitySaveChangePlayerButton, setVisibilitySaveToChangePlayerButton] = useState<boolean>(false)
    const [visibilityDeletePlayerButton, setVisibilityDeletePlayerButton] = useState<boolean>(false)

    function allPlayersList() {
        axios.get("/api/cup/players")
            .then(response => {
                setPlayers(response.data)
            })
    }

    useEffect(allPlayersList, [])


    const handleClickOpen = () => {
        setVisibilitySaveToAddNewPlayerButton(true)
        setVisibilitySaveToChangePlayerButton(false)
        setVisibilityDeletePlayerButton(false)
        setOpen(true)
    }
    return (
        <>
            <h1 className="main-Title">Cup with me🏆</h1>

            <PlayerTable players={players} allPlayersList={allPlayersList}/>
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="contained" onClick={handleClickOpen}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    new player
                </Button>
                <Button variant="contained" onClick={() => propsPlayerList.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
            </div>
            <NewPlayerModal visibilitySaveToAddNewPlayerButton={visibilitySaveToAddNewPlayerButton}
                            visibilitySaveToChangePlayerButton={visibilitySaveChangePlayerButton}
                            visibilityDeletePlayerButton={visibilityDeletePlayerButton}
                            open={open} setOpen={setOpen}
                            allPlayersList={allPlayersList}


            />
        </>
    )
}