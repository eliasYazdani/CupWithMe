import "./CSS/App.css"
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home.tsx";
import TournamentBracket from "./TournamentComponents/TournamentBracket.tsx";
import {useEffect, useState} from "react";
import {Player} from "./Models/Player.ts";
import axios from "axios";
import TournamentList from "./TournamentComponents/TournamentList.tsx";
import PlayerList from "./PlayerComponents/PlayerList.tsx";
import {Tournament} from "./Models/Tournament.ts";
import SignUp from "./SignUp.tsx";


export default function App() {
    const [players, setPlayers] = useState<Player[]>([])
    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [user, setUser] = useState<string>("")

    const isAuthenticated = user !== undefined && user !== "anonymousUser"

    function allPlayerList() {
        axios.get("/api/cup/players")
            .then(response => {
                setPlayers(response.data)
            })
    }


    function allTournamentsList() {
        axios.get("/api/cup/tournaments")
            .then(response => {
                setTournaments(response.data)
            })
    }


    function login(username: string, password: string) {
        axios.post("/api/cup/users/login", null, {auth: {username, password}})
            .then((response) => {
                setUser(response.data)
            })
    }

    function logout() {
        axios.post("/api/cup/users/logout")
            .then(() => {
                setUser("anonymousUser"); // Clear the user data
            })
            .catch(error => {
                console.error("Logout error:", error);
            });
    }

    function signup(username: string, password: string) {
        axios.post("/api/cup/users/signup", null, {auth: {username, password}})
            .then((response) => {
                setUser(response.data)
            })
    }

    console.log(user);


    function me() {
        axios.get("/api/cup/users/me")
            .then(response => {
                setUser(response.data)
            })
    }

    useEffect(() => {
        allPlayerList()
        allTournamentsList()
        me()
    }, [user])


    const navigate = useNavigate();
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home isAuthenticated={isAuthenticated} user={user} onLogin={login}
                                                 onLogout={logout}/>}/>
                <Route path={"/signup"} element={<SignUp user={user} onSignup={signup}/>}/>
                <Route path={"/players"}
                       element={<PlayerList players={players} allPlayerList={allPlayerList} navigate={navigate}/>}/>
                <Route path={"/tournaments"}
                       element={<TournamentList tournaments={tournaments} allTournamentList={allTournamentsList}
                                                navigate={navigate}/>}/>
                <Route path={"/Bracket"}
                       element={<TournamentBracket tournaments={tournaments} players={players}
                                                   navigate={navigate}/>}/>
            </Routes>


        </>
    )
}


