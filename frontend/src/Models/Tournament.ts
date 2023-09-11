
import {Round} from "./Round.ts";


export type Tournament = {
    id: string,
    admin:string,
    tournamentName: string,
    location: string,
    numberOfPlayers: number,
    rounds: Round[],
    champion: string
}
