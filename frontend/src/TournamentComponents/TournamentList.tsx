import axios from "axios";
import {useEffect, useState} from "react";
import {Tournament} from "./Tournament.ts";
import TournamentTable from "../TournamentComponents/TournamentTable.tsx";
import Button from "@mui/material/Button";
import {NavigateFunction} from "react-router-dom";

type PropsTournamentList = {

    navigate: NavigateFunction
}

export default function TournamentList(propsTournamentList: PropsTournamentList) {
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
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="contained" onClick={() => propsTournamentList.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
            </div>
        </>
    )
}