import {MatchModel} from "./MatchModel.ts";

export type TournamentWithoutIdWithMatch = {
    tournamentName: string,
    location: string,
    numberOfPlayers: number,
    matches: MatchModel[]

}
