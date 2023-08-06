import axios from "axios";
import {useEffect, useState} from "react";
import {Tournament} from "./Tournament.ts";
import TournamentTable from "../TournamentComponents/TournamentTable.tsx";


export default function TournamentList() {
    const [tournaments, setTournaments] = useState<Tournament[]>([])

    function allTournamentsList() {
        axios.get("/api/cup/tournaments")
            .then(response => {
                setTournaments(response.data)
                console.log(response.data)
            })

    }

    useEffect(allTournamentsList, [])
    return (
        <>
            <h1 className="main-Title">Cup with me🏆</h1>

            <TournamentTable tournaments={tournaments}/>
        </>
    )
}