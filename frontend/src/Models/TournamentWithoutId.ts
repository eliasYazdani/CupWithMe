
import {RoundWithoutId} from "./RoundWithoutId.ts";


export type TournamentWithoutId = {
    admin: string,
    tournamentName: string,
    location: string,
    numberOfPlayers: number,
    roundsWithoutId: RoundWithoutId[],
    champion: string

}
