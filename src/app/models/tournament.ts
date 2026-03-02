import { Round } from "./round";
import { User } from "./user";

export interface Tournament {
    id: string;
    name: string;
    creator: User
    rounds: Round[];
}