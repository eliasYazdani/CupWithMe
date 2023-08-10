import "./App.css"
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home.tsx";
import TournamentBracket from "./TournamentComponents/TournamentBracket.tsx";
import {useEffect, useState} from "react";
import {Player} from "./Models/Player.ts";
import axios from "axios";
import TournamentList from "./TournamentComponents/TournamentList.tsx";
import PlayerList from "./PlayerComponents/PlayerList.tsx";
import {Tournament} from "./Models/Tournament.ts";


export default function App() {
    const [players, setPlayers] = useState<Player[]>([])
    const [tournaments, setTournaments] = useState<Tournament[]>([])


    function allPlayerList() {
        axios.get("/api/cup/players")
            .then(response => {
                setPlayers(response.data)
            })
    }

    useEffect(allPlayerList, [])

    function allTournamentsList() {
        axios.get("/api/cup/tournaments")
            .then(response => {
                setTournaments(response.data)

            })

    }

    useEffect(allTournamentsList, [])

    const navigate = useNavigate();
    return (
        <>


        <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/players"}
                       element={<PlayerList players={players} allPlayerList={allPlayerList} navigate={navigate}/>}/>
                <Route path={"/tournaments"}
                       element={<TournamentList tournaments={tournaments} allTournamentList={allTournamentsList}
                                                navigate={navigate}/>}/>
                <Route path={"/Bracket"}
                       element={<TournamentBracket tournaments={tournaments} players={players} navigate={navigate}/>}/>
            </Routes>

        </>


    )
}


