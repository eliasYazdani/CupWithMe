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
                         src="https://cdn.pixabay.com/photo/2016/11/29/07/06/bleachers-1867992_1280.jpg"
                         alt="Stadium"/>
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
                            <h2> 3 easy-peasy steps to your goal 🥅</h2>
                            <ol>
                                <li> Sign up easily and log in</li>
                                <li> Add some new players</li>
                                <li> Create a tournament with basic infos, add the players into the tournament, and enjoy it</li>
                            </ol>
                            <br/>
                            <p>🚩For security purposes, please note that passwords are securely hashed and stored in the database.<br/>
                                  This means that even system administrators cannot view your actual password.<br/>
                                  Your password is protected with advanced cryptographic techniques to safeguard your account.</p>
                        </div>
                        <div >

                        </div>
                    </div>
                </div>
                <img className="image"
                     src="https://cdn.pixabay.com/photo/2016/11/29/07/06/bleachers-1867992_1280.jpg"
                     alt="Stadium"/>
            </div>
        )
    );
}
