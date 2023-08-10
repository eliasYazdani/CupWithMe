import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import LoginPage from "./LoginPage.tsx";


export default function Home() {

    const navigate = useNavigate();
    return (
        <>
            <h1 style={{color: "red", textAlign: "center"}}>Cup With Me!!</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
            }}>
                <LoginPage/>
                <img style={{width: "75%", margin: "40px 0"}}
                     src="https://www.shutterstock.com/image-illustration/football-stadium-night-imaginary-modelled-600w-1912601503.jpg"
                     alt="Football field"/>
            </div>
            <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>

                <Button variant="contained" onClick={() => navigate("/players")}
                        sx={{fontSize: "10px", padding: "5px 10px"}}>
                    Players
                </Button>
                <Button variant="contained" onClick={() => navigate("/tournaments")}
                        sx={{fontSize: "10px", padding: "5px 10px"}}>
                    Tournaments
                </Button>
            </div>
        </>

    )
}
