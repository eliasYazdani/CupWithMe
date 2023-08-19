import {FormEvent, useState} from "react";
import "./CSS/LoginPage.css"

type PropsLogin = {
    user: string
    onLogin: (username: string, password: string) => void
}
export default function LoginPage(propsLogin: PropsLogin) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function onLogin(event: FormEvent) {
        event.preventDefault()
        propsLogin.onLogin(username, password)


    }

    return (
        <form onSubmit={onLogin} className="login-form">
            <p style={{color: "white"}}>{propsLogin.user}</p>

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
            <button className="login-button">
                <span className="white-text">Login</span>
            </button>
        </form>
    );
}

