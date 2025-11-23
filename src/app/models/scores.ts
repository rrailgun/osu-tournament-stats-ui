import { Beatmap } from "./beatmap";

export interface Score {
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
    username: string;
    country_code: string;
    country_name: string;
    title: string;
    artist: string;
    creator: string;
    difficulty_rating: number;
    difficulty_name: string;
    beatmapset_id: number;
    match_name: string;
    round_name: string;
    tournament_name: string;
}




export interface GroupedScoresResult {
    key: string;
    column: string;
    rows: Score[];
};

export interface GroupedScoreResultByBeatmapId {
    beatmap_info: Beatmap;
    scores: Score[];
}