import { Round } from "./round";

export interface Tournament {
    id: string;
    name: string;
    creator_id: string;
    creator_username: string;
    rounds: Round[];
}