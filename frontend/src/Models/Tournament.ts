import {MatchModel} from "./MatchModel.ts";


export type Tournament = {
    id: string,
    tournamentName: string,
    location: string,
    numberOfPlayers: number,
    matches: MatchModel[],
    champion: string
}
