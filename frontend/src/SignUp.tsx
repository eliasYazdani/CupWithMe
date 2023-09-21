import {FormEvent, useState} from "react";
import {UserWithoutId} from "./Models/UserWithoutId.ts";
import "./CSS/signUp.css"
import Button from "@mui/material/Button";
import {NavigateFunction} from "react-router-dom";

type PropsSignUp = {
    user: string
    onSignup: (newUser: UserWithoutId) => void
    navigate: NavigateFunction,
    signupError: string | null
}
export default function SignUp(propsSignUp: PropsSignUp) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [error, setError] = useState<string>("");

    function onSignUp(event: FormEvent) {
        event.preventDefault()
        setError("")
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const newUser: UserWithoutId = {
            username: username,
            password: password
        };

        propsSignUp.onSignup(newUser);
    }

    return (
        <form onSubmit={onSignUp} className="signUp">
            <p style={{color: "white"}}>{propsSignUp.user}</p>
            <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
            />
            <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
            />
            <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm Password"
                type="password"
            />
            {error && <p style={{color: "red", fontWeight: "bold"}}>{error}</p>}
            {propsSignUp.signupError && <p style={{color: "red", fontWeight: "bold"}}>{propsSignUp.signupError}</p>}

            <div className="buttons">
                <Button variant="contained" type="submit"
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Sign Up
                </Button>
                <Button variant="contained" onClick={() => propsSignUp.navigate("/")}
                        sx={{fontSize: "10px", padding: "5px 10px", margin: "40px 0"}}>
                    Home
                </Button>
            </div>
        </form>
    );
}