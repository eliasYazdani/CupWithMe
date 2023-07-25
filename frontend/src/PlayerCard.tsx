import React from 'react';
import {Player} from "./Player.ts";

type ProbsPlayer={
    player: Player
}

export  default function PlayerCard(propsPlayer: ProbsPlayer) {
    return (
        <div>
            {propsPlayer.player.firstName}  {propsPlayer.player.lastName}
        </div>
    );
}

