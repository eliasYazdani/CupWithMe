import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


export default function Home() {

    const navigate = useNavigate();
    return (
        <>
            <h1 style={{color: "red", textAlign: "center"}}>Cup With Me!!</h1>
            <img style={{width: "100%", margin: "40px 0"}}
                 src="https://www.shutterstock.com/image-illustration/football-stadium-night-imaginary-modelled-600w-1912601503.jpg"
                 alt="football"/>
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>

                <Button variant="contained" onClick={() => navigate("/players")}
                        sx={{fontSize: "10px", padding: "5px 10px"}}>
                    PlayerList
                </Button>
                <Button variant="contained" onClick={() => navigate("/tournaments")}
                        sx={{fontSize: "10px", padding: "5px 10px"}}>
                    Tournaments
                </Button>
            </div>
        </>

    )
}
