import { DezeerService, Paginated } from '../service/deezer';

export interface Playlist {
    id: number;
    title: string;
    duration: number;
    public: boolean;
    is_loved_track: boolean;
    collaborative: boolean;
    nb_tracks: number;
    fans: number;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    checksum: string;
    tracklist: string;
    creation_date: string;
    md5_image: string;
    picture_type: string;
    time_add: number;
    time_mod: number;
    creator: Creator;
    type: 'playlist';
}

interface Creator {
    id: number;
    name: string;
    tracklist: string;
    type: 'user';
}

export class PlaylistEntity {
    constructor(private readonly dezeerService: DezeerService) {}

    public async getPlaylists(): Promise<Paginated<Playlist>> {
        return await this.dezeerService.get<Paginated<Playlist>>('/user/me/playlists');
    }

    public async addTracks(playlistId: number, trackIds: number[]): Promise<boolean> {
        if (trackIds.length === 0) {
            return true;
        }
        return await this.dezeerService.post<boolean>(`/playlist/${playlistId}/tracks`, { songs: trackIds.join(',') });
    }

    public async removeTracks(playlistId: number, trackIds: number[]): Promise<boolean> {
        if (trackIds.length === 0) {
            return true;
        }
        return await this.dezeerService.delete<boolean>(`/playlist/${playlistId}/tracks`, { songs: trackIds.join(',') });
    }

    public async orderTracks(playlistId: number, trackIds: number[]): Promise<boolean> {
        if (trackIds.length === 0) {
            return true;
        }
        return await this.dezeerService.post<boolean>(`/playlist/${playlistId}/tracks`, { order: trackIds.join(',') });
    }
}
