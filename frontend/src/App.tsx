import PlayerColumn from "./PlayerColumn.tsx";
import {Player} from "./Player.ts";
import "./App.css"
import axios from "axios";
import {useEffect, useState} from "react";


export default function App() {

    const [players, setPlayers] = useState<Player[]>([])


    function allPlayersList() {
        axios.get("/api/cup/players")
            .then(response => {
                setPlayers(response.data)
            })
    }

    useEffect(allPlayersList, [])


    return (
        <>
            <h1 className="main-Title">Cup with me🏆</h1>

            <PlayerColumn players={players}/>

        </>
    )
}


