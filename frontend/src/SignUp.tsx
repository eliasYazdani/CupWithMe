import {FormEvent, useState} from "react";

type PropsSignUp = {
    user: string
    onSignup: (username: string, password: string) => void
}
export default function SignUp(propsSignUp: PropsSignUp) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function onSignUp(event: FormEvent) {
        event.preventDefault()
        propsSignUp.onSignup(username, password)


    }

    return (
        <form onSubmit={onSignUp}>

            <p>{propsSignUp.user}</p>
            <p> Sign Up</p>
            <input value={username} onChange={event => setUsername(event.target.value)} placeholder="Username"/>
            <input value={password} onChange={event => setPassword(event.target.value)} placeholder="Password"
                   type="password"/>
            <button>Signup</button>
        </form>
    )
}