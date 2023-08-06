import "./App.css"
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home.tsx";
import PlayerList from "./PlayerComponents/PlayerList.tsx";
import TournamentList from "./TournamentComponents/TournamentList.tsx";


export default function App() {
    const navigate = useNavigate();
        return (
        <>

            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/players"} element={<PlayerList navigate={navigate}/>}/>
                <Route path={"/tournaments"} element={<TournamentList navigate={navigate}/>}/>
            </Routes>
        </>
    )
}


