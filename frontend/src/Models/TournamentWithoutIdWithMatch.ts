import {MatchModel} from "./MatchModel.ts";


export type TournamentWithoutIdWithMatch = {
    admin:string,
    tournamentName: string,
    location: string,
    numberOfPlayers: number,
    matches: MatchModel[],
    champion: string

}
