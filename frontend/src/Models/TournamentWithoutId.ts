import {MatchWithoutId} from "./MatchWithoutId.ts";


export type TournamentWithoutId = {
    admin: string,
    tournamentName: string,
    location: string,
    numberOfPlayers: number,
    matchesWithoutId: MatchWithoutId[],
    champion: string

}
