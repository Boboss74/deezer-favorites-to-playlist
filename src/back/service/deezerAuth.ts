import axios from 'axios';
import { requireEnvVarString } from '../util/environment';
import { addSearchParams } from '../util/url';

interface AccessTokenResponse {
    access_token: string;
    expires: number;
}

export interface AccessTokenData extends AccessTokenResponse {
    expiresAt: Date;
}

export class DeezerAuth {
    private static readonly APP_ID = requireEnvVarString('APP_ID');
    private static readonly APP_SECRET = requireEnvVarString('APP_SECRET');

    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    public static async getAccessTokenData(code: string): Promise<AccessTokenData> {
        const url = new URL('https://connect.deezer.com/oauth/access_token.php');
        addSearchParams(url, { app_id: DeezerAuth.APP_ID, secret: DeezerAuth.APP_SECRET, code, output: 'json' });
        const accessTokenResponse = (await axios.get<AccessTokenResponse>(url.href)).data;
        return { ...accessTokenResponse, expiresAt: this.computeExpiredAt(accessTokenResponse.expires) };
    }

    public async getAccessToken(): Promise<string> {
        return this.accessToken;
    }

    public static computeExpiredAt(timeLifeInSec: number): Date {
        const timestamp = new Date().getTime();
        return new Date(Math.floor(timestamp + Number(1000 * timeLifeInSec)));
    }
}
