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
            <h1 className="main-Title">Cup With Me🏆</h1>
            <div className="content">
                {propsHome.isAuthenticated ? (
                    <div className="button-container">
                        <div className="userLogout">
                            <p className="user">{propsHome.user}</p>
                            <Button variant="contained" onClick={propsHome.onLogout}
                                    sx={{fontSize: "10px", padding: "5px 10px"}}>
                                Logout
                            </Button>
                        </div>
                        <div className="playersTournamentsButtons">
                            <Button variant="contained"
                                    onClick={() => propsHome.isAuthenticated ? navigate("/players") : navigate("/")}
                                    sx={{fontSize: "10px", padding: "5px 10px"}}>
                                Players
                            </Button>
                            <Button variant="contained"
                                    onClick={() => propsHome.isAuthenticated ? navigate("/tournaments") : navigate("/")}
                                    sx={{fontSize: "10px", padding: "0px 10px"}}>
                                Tournaments
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="login-signup">
                        <LoginPage user={propsHome.user} onLogin={propsHome.onLogin}/>
                        <Button onClick={() => navigate("/signup")} variant="contained"
                                sx={{fontSize: "10px", padding: "5px 10px"}}>
                            Sign up
                        </Button>
                    </div>
                )}
                <img className="image"
                     src="https://www.shutterstock.com/image-illustration/football-stadium-night-imaginary-modelled-600w-1912601503.jpg"
                     alt="Football field"/>
            </div>
        </div>
    );
}


