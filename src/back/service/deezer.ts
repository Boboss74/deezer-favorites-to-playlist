import axios from 'axios';
import { URL } from 'url';
import { PlaylistEntity } from '../entity/playlist';
import { TrackEntity } from '../entity/track';
import { UserEntity } from '../entity/user';
import { addSearchParams } from '../util/url';
import { DeezerAuth } from './deezerAuth';

export interface Paginated<T> {
    data: T[];
    total: number;
    prev?: string;
    next?: string;
}

export class DezeerService {
    private static readonly DEEZER_API_URL = 'https://api.deezer.com';

    public readonly playlistEntity: PlaylistEntity;
    public readonly trackEntity: TrackEntity;
    public readonly userEntity: UserEntity;

    private readonly deezerAuth: DeezerAuth;

    private constructor(deezerAuth: DeezerAuth) {
        this.deezerAuth = deezerAuth;
        this.trackEntity = new TrackEntity(this);
        this.playlistEntity = new PlaylistEntity(this);
        this.userEntity = new UserEntity(this);
    }

    public static init(accessToken: string): DezeerService {
        return new DezeerService(new DeezerAuth(accessToken));
    }

    public async get<T>(urlPath: string, queryStringParameters: Record<string, unknown> = {}): Promise<T> {
        const url = new URL(urlPath, DezeerService.DEEZER_API_URL);
        addSearchParams(url, { ...queryStringParameters, access_token: await this.deezerAuth.getAccessToken() });
        const response = await axios.get<T>(url.href);
        return response.data;
    }

    public async post<T>(urlPath: string, queryStringParameters: Record<string, unknown> = {}): Promise<T> {
        return this.get(urlPath, { ...queryStringParameters, request_method: 'POST' });
    }

    public async delete<T>(urlPath: string, queryStringParameters: Record<string, unknown> = {}): Promise<T> {
        return this.get(urlPath, { ...queryStringParameters, request_method: 'DELETE' });
    }
}
