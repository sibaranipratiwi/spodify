import { UserProfile, Track } from "./spotifyType";

export interface IAuthenticationState {
    isAuthenticate: boolean;
    accessToken: string;
    user: UserProfile | null;
}

export interface IPlaylistState {
    tracks: Track[];
    selectTracks: string[];
    form: {
        title: string;
        description: string;
    }
}