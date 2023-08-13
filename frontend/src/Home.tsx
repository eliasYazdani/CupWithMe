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
        <>
            <h1 style={{color: "red", textAlign: "center"}}>Cup With Me🏆</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
            }}>

                {propsHome.isAuthenticated
                    ?
                    <div style={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "center"}}>
                        <div style={{display: "flex", gap: "10px", justifyContent: "right"}}>
                            <p>{propsHome.user}</p>
                            <Button variant="contained" onClick={propsHome.onLogout}
                                    sx={{fontSize: "10px", padding: "5px 5px"}}>
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
                    <div style={{display: "flex", flexDirection: "column", gap: "10px", alignItems: "center"}}>
                        <img style={{width: "100%", margin: "40px 0"}}
                             src="https://media.istockphoto.com/id/1449580178/vector/under-construction-sign-vector-for-banner-website-ig.jpg?s=2048x2048&w=is&k=20&c=ckEOtEfJX6tpR0ApGnPu6B3GTuNcMVWFo5c-BjuKdRE="
                             alt="Construction"/>

                        <p>Please use the username 'abc', Password '123' as long as there is construction</p>

                        <LoginPage user={propsHome.user} onLogin={propsHome.onLogin}/>

                        <Button onClick={() => navigate("/signup")} variant="contained"
                                sx={{fontSize: "10px", padding: "5px 10px"}}>Sign up</Button>

                    </div>
                }
                <img style={{width: "75%", margin: "40px 0"}}
                     src="https://www.shutterstock.com/image-illustration/football-stadium-night-imaginary-modelled-600w-1912601503.jpg"
                     alt="Football field"/>
            </div>

        </>

    )
}

