import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


export default function Home() {

    const navigate = useNavigate();
    return (
        <>
            <h1 style={{color: "red", textAlign: "center"}}>Cup With Me!!</h1>
            <img style={{width: "100%"}}
                 src="https://www.shutterstock.com/image-illustration/football-stadium-night-imaginary-modelled-600w-1912601503.jpg"
                 alt="football"/>
            <Button variant="contained" onClick={() => navigate("/players")}>
                PlayerList
            </Button><Button variant="contained" onClick={() => navigate("/tournaments")}>
            Tournaments
        </Button>
        </>

    )
}
