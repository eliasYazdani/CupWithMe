import {MatchWithoutId} from "./MatchWithoutId.ts";

export type TournamentWithoutId = {
    tournamentName: string,
    location: string,
    numberOfPlayers: number,
    matchWithoutId: MatchWithoutId

}
