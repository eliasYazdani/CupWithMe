import {MatchModel} from "./MatchModel.ts";

export type Round = {
    id: string,
    matches: MatchModel[],
}