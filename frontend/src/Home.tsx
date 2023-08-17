import "./CSS/Home.css"
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import LoginPage from "./LoginPage.tsx";

type PropsHome = {
    user: string
    onLogin: (username: string, password: string) => void
    onLogout: () => void,
    isAuthenticated: boolean
}
export default function Home(propsHome: PropsHome) {

    const navigate = useNavigate();

    return (
        <div className="home">
            <h1 style={{color: "red", textAlign: "center"}}>Cup With Me🏆</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                gap: "20px"
            }}>

                {propsHome.isAuthenticated
                    ?
                    <div style={{display: "flex", flexDirection: "column", gap: "150px", alignItems: "center"}}>
                        <div style={{display: "flex", gap: "50vw"}}>
                            <p style={{color: 'white', fontSize: "20px"}}>{propsHome.user}</p>
                            <Button variant="contained" onClick={propsHome.onLogout}
                                    sx={{fontSize: "10px", padding: "5px 10px"}}>
                                Logout
                            </Button>
                        </div>
                        <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>

                            <Button variant="contained"
                                    onClick={() => propsHome.isAuthenticated ? navigate("/players") : navigate("/")}
                                    sx={{fontSize: "10px", padding: "5px 10px"}}>
                                Players
                            </Button>
                            <Button variant="contained"
                                    onClick={() => propsHome.isAuthenticated ? navigate("/tournaments") : navigate("/")}
                                    sx={{fontSize: "10px", padding: "5px 10px"}}>
                                Tournaments
                            </Button>
                        </div>
                    </div>
                    :
                    <div style={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "center "}}>

                        <LoginPage user={propsHome.user} onLogin={propsHome.onLogin}/>

                        <Button onClick={() => navigate("/signup")} variant="contained"
                                sx={{fontSize: "10px", padding: "5px 10px"}}>
                            Sign up
                        </Button>
                    </div>
                }
                <img style={{width: "95vw", margin: "0px 0"}}
                     src="https://www.shutterstock.com/image-illustration/football-stadium-night-imaginary-modelled-600w-1912601503.jpg"
                     alt="Football field"/>
            </div>

        </div>

    )
}

