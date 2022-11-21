import * as dotenv from 'dotenv';
dotenv.config();

import { favoritesToPlaylist } from '../../src/back/function/favoritesToPlaylist';

const accessToken = '';
const playlistId = 0;

void (async () => {
    const result = await favoritesToPlaylist(accessToken, playlistId);
    console.log(JSON.stringify(result));
    process.exit(0);
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
