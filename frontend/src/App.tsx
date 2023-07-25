
import PlayerColumn from "./PlayerColumn.tsx";
import {Player} from "./Player.ts";
import "./App.css"


export default function App() {

    const players: Player[] = [
        {
            "id": "1",
            "firstName": "Timo",
            "lastName": "B",
            "age":35,
        },
        {
            "id": "2",
            "firstName": "Franck",
            "lastName": "C",
            "age":23,
        },
        {
            "id": "3",
            "firstName": "Janis",
            "lastName": "H",
            "age":40,
        },

    ]

    return (
        <>
            <h1 className="main-Title">Cup with me🏆</h1>

            <PlayerColumn players={players} />

        </>
    )
}


