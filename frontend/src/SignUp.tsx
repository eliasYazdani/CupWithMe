import {FormEvent, useState} from "react";
import {UserWithoutId} from "./Models/UserWithoutId.ts";

type PropsSignUp = {
    user: string
    onSignup: (newUser: UserWithoutId) => void
}
export default function SignUp(propsSignUp: PropsSignUp) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function onSignUp(event: FormEvent) {
        event.preventDefault()
        const newUser: UserWithoutId = {
            username: username,
            password: password
        };

        propsSignUp.onSignup(newUser);


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