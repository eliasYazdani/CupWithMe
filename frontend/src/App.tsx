import "./App.css"
import {Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import PlayerList from "./PlayerComponents/PlayerList.tsx";


export default function App() {
        return (
        <>

            <Routes>
                <Route path={"/"} element={<Home/>} />
                <Route path={"/players"} element={<PlayerList/>}/>
            </Routes>
        </>
    )
}


