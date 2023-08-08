import "./App.css"
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home.tsx";
import TournamentBracket from "./TournamentComponents/TournamentBracket.tsx";
import TournamentGrid from "./TournamentComponents/TournamentGrid.tsx";
import {useEffect, useState} from "react";
import {Player} from "./Models/Player.ts";
import axios from "axios";
import TournamentList from "./TournamentComponents/TournamentList.tsx";
import PlayerList from "./PlayerComponents/PlayerList.tsx";


export default function App() {
    const [players, setPlayers] = useState<Player[]>([])

    function allPlayerList() {
        axios.get("/api/cup/players")
            .then(response => {
                setPlayers(response.data)
            })
    }

    useEffect(allPlayerList, [])

    const navigate = useNavigate();
    return (
        <>
            <TournamentGrid playerCount={4}/>

            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/players"}
                       element={<PlayerList players={players} allPlayerList={allPlayerList} navigate={navigate}/>}/>
                <Route path={"/tournaments"} element={<TournamentList navigate={navigate}/>}/>
                <Route path={"/Bracket"} element={<TournamentBracket players={players} navigate={navigate}/>}/>
            </Routes>

        </>


    )
}


