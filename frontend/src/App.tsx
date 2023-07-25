import {Player} from "./Player.ts";
import PlayerColumn from "./PlayerColumn.tsx";


function App() {

    const players: Player[] = [
        {
            "id": "1",
            "firstName": "Timo",
            "lastName": "B"
        },
        {
            "id": "2",
            "firstName": "Franck",
            "lastName": "C"
        },
        {
            "id": "3",
            "firstName": "Janis",
            "lastName": "H"
        },

    ]

    return (
        <>
            <h1>Cup with me🏆</h1>
            <PlayerColumn players={players}/>

        </>
    )
}

export default App
