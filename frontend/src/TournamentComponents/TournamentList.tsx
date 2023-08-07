import axios from "axios";
import {useEffect, useState} from "react";
import {Tournament} from "./Tournament.ts";
import TournamentTable from "../TournamentComponents/TournamentTable.tsx";
import Button from "@mui/material/Button";
import {NavigateFunction} from "react-router-dom";
import NewTournamentModal from "./NewTournamentModal.tsx";

type PropsTournamentList = {

    navigate: NavigateFunction
}

export default function TournamentList(propsTournamentList: PropsTournamentList) {
    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [open, setOpen] = useState(false);
    const [visibilitySaveToAddNewTournamentButton, setVisibilitySaveToAddNewTournamentButton] = useState<boolean>(false)

    function allTournamentsList() {
        axios.get("/api/cup/tournaments")
            .then(response => {
                setTournaments(response.data)
                console.log(response.data)
            })

    }

    useEffect(allTournamentsList, [])

    const handleClickOpen = () => {
        setVisibilitySaveToAddNewTournamentButton(true)

        setOpen(true)
    }
    return (
        <>
            <h1 className="main-Title">Cup with me🏆</h1>

            <TournamentTable tournaments={tournaments} navigate={propsTournamentList.navigate}/>
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="contained" onClick={handleClickOpen}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    new Tournament
                </Button>
                <Button variant="contained" onClick={() => propsTournamentList.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
            </div>
            <NewTournamentModal visibilitySaveToAddNewTournamentButton={visibilitySaveToAddNewTournamentButton}

                                open={open} setOpen={setOpen}
                                allTournamentsList={allTournamentsList}


            />
        </>
    )
}
