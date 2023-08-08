import {Player} from "../Models/Player.ts";
import PlayerWithScore from "./PlayerWithScore.tsx";

type Props = {

    players: Player[]
}
export default function Match(props: Props) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <PlayerWithScore players={props.players}/>
            <PlayerWithScore players={props.players}/>
        </div>
    );
}

