import {FormEvent, useState} from "react";


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
        <form onSubmit={onLogin}>

            <p>{propsLogin.user}</p>
            <p> Login</p>
            <input value={username} onChange={event => setUsername(event.target.value)} placeholder="Username"/>
            <input value={password} onChange={event => setPassword(event.target.value)} placeholder="Password"
                   type="password"/>
            <button> Login</button>
        </form>
    );
}

