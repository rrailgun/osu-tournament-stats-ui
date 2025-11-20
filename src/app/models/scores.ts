export interface Scores {
    match_id: number;
    player_id: number;
    beatmap_id: number;
    score: number;
    count300: number;
    count100: number;
    count50: number;
    countmiss: number;
    accuracy: number;
    combo: number;
    mods: string[];
    rank: string;
    date: string;
    round_id: string;
    tournament_id: string;
    slot: string;
    player_username: string;
    country_code: string;
    country_name: string;
    beatmap_title: string;
    beatmap_artist: string;
    beatmap_creator: string;
    beatmap_sr: number;
    match_name: string;
    round_name: string;
    tournament_name: string;
    difficulty_name: string;
    beatmapset_id: number;
}



export interface GroupedScoresResult {
    key: string;
    column: string;
    rows: Scores[];
};