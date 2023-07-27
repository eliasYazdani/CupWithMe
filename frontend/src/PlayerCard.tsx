import {Player} from "./Player.ts";

type PropsPlayer={
    player: Player
}

export  default function PlayerCard(propsPlayer: PropsPlayer) {
    return (
        <div>
            {propsPlayer.player.firstName}  {propsPlayer.player.lastName}
        </div>
    );
}

