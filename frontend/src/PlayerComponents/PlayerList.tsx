
import {Player} from "./Player.ts";
import "../App.css"
import axios from "axios";
import {useEffect, useState} from "react";
import PlayerBasicTable from "./PlayerBasicTable.tsx"


export default function PlayerList() {

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

            <PlayerBasicTable players={players}  />

        </>
    )
}


