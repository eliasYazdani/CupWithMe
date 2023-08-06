import Button from "@mui/material/Button";
import {NavigateFunction} from "react-router-dom";

type PropsTournamentBracket = {

    navigate: NavigateFunction
}

export default function TournamentBracket(propsTournamentBracket: PropsTournamentBracket) {
    return (
        <>
            <h3>Bracket</h3>
            <img
                style={{width: "100%", margin: "40px 0"}}
                src={"https://www.shutterstock.com/image-vector/modern-sport-game-tournament-championship-600w-1935957601.jpg"}
                alt="Bracket"
            />
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="contained" onClick={() => propsTournamentBracket.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
            </div>
        </>
    )
}