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
import {UserWithoutId} from "./Models/UserWithoutId.ts";
import {Round} from "./Models/Round.ts";


export default function App() {
    const [players, setPlayers] = useState<Player[]>([])
    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [user, setUser] = useState<string>("")
    const [roundsToUpdate, setRoundsToUpdate] = useState<Round[]>([])
    const [signupError, setSignupError] = useState<string | null>(""); // Add a state variable for signup error

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
                console.log(response.data)
                setTournaments(response.data)
            })
    }

    function handleMatchesToUpdate(tournamentId: string) {
        const selectedTournament = tournaments.find((tournament) => tournament.id === tournamentId)
        if (selectedTournament) {
            setRoundsToUpdate(selectedTournament.rounds)
        }
    }


    function signup(newUserToSignup: UserWithoutId) {
        axios.get(`/api/cup/users/check-username/${newUserToSignup.username}`)
            .then((response) => {
                if (response.data === true) {
                    setSignupError("This username is already taken");
                } else {
                    axios.post("/api/cup/users/signup", newUserToSignup)
                        .then(() => {
                            login(newUserToSignup.username, newUserToSignup.password);
                        })
                        .then(() => {
                            navigate("/");
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.error("Error during signup:", error);
                                setSignupError(error.response.data);
                            }
                        });
                    setSignupError("")
                }
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
        <div className="app">
            <Routes>
                <Route path={"/"}
                       element={<Home isAuthenticated={isAuthenticated}
                                      user={user} onLogin={login}
                                      onLogout={logout}/>}/>
                <Route path={"/signup"}
                       element={<SignUp user={user}
                                        onSignup={signup}
                                        signupError={signupError}
                                        navigate={navigate}/>}/>
                <Route path={"/players"}
                       element={<PlayerList players={players}
                                            allPlayerList={allPlayerList}
                                            user={user}
                                            navigate={navigate}/>}/>
                <Route path={"/tournaments"}
                       element={<TournamentList tournaments={tournaments}
                                                allTournamentList={allTournamentsList}
                                                user={user}
                                                navigate={navigate}
                                                handleMatchesToUpdate={handleMatchesToUpdate}/>}/>
                <Route path="/Bracket/:tournamentId"
                       element={<TournamentBracket allTournamentsList={allTournamentsList}
                                                   tournaments={tournaments}
                                                   players={players}
                                                   user={user}
                                                   navigate={navigate}
                                                   roundsToUpdate={roundsToUpdate}/>}/>
            </Routes>


        </div>
    )
}


