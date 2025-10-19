    
export interface Scores {
    tournament_id: string;
    match_id: number;
    player_id: number;
    beatmap_id: number;
    score: number;
    count300: number;
    count100: number;
    count50: number;
    countmiss: number;
    combo: number;
    mods: string[];
    }
