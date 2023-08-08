import Button from "@mui/material/Button";
import {NavigateFunction} from "react-router-dom";

import {Player} from "../Models/Player.ts";
import Match from "./Match.tsx";

type PropsTournamentBracket = {

    navigate: NavigateFunction
    players: Player[]

}

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    return (
        <div>
            <h3>Bracket</h3>

            <Match players={propsTournamentBracket.players}/>

            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="contained" onClick={() => propsTournamentBracket.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
            </div>
        </div>
    )
}