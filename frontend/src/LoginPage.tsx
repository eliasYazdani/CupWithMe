import {FormEvent, useState} from "react";
import "./CSS/LoginPage.css"

type PropsLogin = {
    user: string
    onLogin: (username: string, password: string) => void
}
export default function LoginPage(propsLogin: PropsLogin) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState(false);


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
            <div className="password-container">
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                />
                <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "🕶️" : "🔍️"}
                </span>
            </div>
            <button className="login-button">
                <span className="white-text">Login</span>
            </button>
        </form>
    );
}
