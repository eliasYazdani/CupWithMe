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
        propsHome.isAuthenticated ? (
            <div className="loginMode">
                <h1 className="main-Title">Cup With Me🏆</h1>
                <div className="userLogout">
                    <p className="user">{propsHome.user}</p>
                    <Button variant="contained" onClick={propsHome.onLogout}
                            sx={{fontSize: "10px", padding: "5px 10px"}}>
                        Logout
                    </Button>
                </div>
                <div className="buttonsWithImage">
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
                    <img className="image"
                         src="https://www.shutterstock.com/image-illustration/football-stadium-night-imaginary-modelled-600w-1912601503.jpg"
                         alt="Football field"/>
                </div>
            </div>
        ) : (
            <div className="logoutMode">
                <div className="topSite">
                    <h1 className="main-Title">Cup With Me🏆</h1>
                    <div className="login-signup-instruction">
                        <div className="login-signup">
                            <LoginPage user={propsHome.user} onLogin={propsHome.onLogin}/>
                            <Button onClick={() => navigate("/signup")} variant="contained"
                                    sx={{fontSize: "10px", padding: "5px 10px"}}>
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <h2> 3 easy-peasy steps to goal </h2>
                            <ol>
                                <li> signup easily then will be logged-in</li>
                                <li>add some new players</li>
                                <li>create a tournament with basic Info and add the players into tournament  and enjoy it</li>
                            </ol>
                        </div>
                        <div >

                        </div>
                    </div>
                </div>
                <img className="image"
                     src="https://www.shutterstock.com/image-illustration/football-stadium-night-imaginary-modelled-600w-1912601503.jpg"
                     alt="Football field"/>
            </div>
        )
    );
}
