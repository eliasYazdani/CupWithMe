
import {Round} from "./Round.ts";


export type TournamentWithoutIdWithMatch = {
    admin:string,
    tournamentName: string,
    location: string,
    numberOfPlayers: number,
    rounds: Round[],
    champion: string

}
