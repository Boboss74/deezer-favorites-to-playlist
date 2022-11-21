import { DezeerService, Paginated } from '../service/deezer';
import { Album } from './album';
import { Artist } from './artist';

export interface Track {
    id: number;
    readable: boolean;
    title: string;
    link: string;
    duration: number;
    rank: number;
    explicit_lyrics: boolean;
    explicit_content_lyrics: number;
    explicit_content_cover: number;
    md5_image: string;
    time_add: number;
    album: Album;
    artist: Artist;
    type: 'track';
}

export class TrackEntity {
    constructor(private readonly dezeerService: DezeerService) {}

    public async getFavoriteTracks(): Promise<Paginated<Track>> {
        return await this.dezeerService.get<Paginated<Track>>('/user/me/tracks');
    }

    public async getPlaylistTracks(playlistId: number): Promise<Paginated<Track>> {
        return await this.dezeerService.get<Paginated<Track>>(`/playlist/${playlistId}/tracks`);
    }
}
