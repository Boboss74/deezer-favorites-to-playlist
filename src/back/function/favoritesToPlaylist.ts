import { APIGatewayProxyEventV2, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { DezeerService } from '../service/deezer';
import { requireQueryNumberParameter, requireQueryStringParameter } from '../util/apiGateway';

interface FavoritesToPlaylistResponse {
    trackIdsAdded: number[];
    trackIdsRemoved: number[];
}

export async function favoritesToPlaylist(accessToken: string, playlistId: number): Promise<FavoritesToPlaylistResponse> {
    const dezeerService = DezeerService.init(accessToken);

    const favoriteTracks = (await dezeerService.trackEntity.getFavoriteTracks()).data;
    const playlistTracks = (await dezeerService.trackEntity.getPlaylistTracks(playlistId)).data;

    const favoriteTracksMap = new Map(favoriteTracks.sort((a, b) => a.time_add - b.time_add).map((t) => [t.id, t]));
    const playlistTracksMap = new Map(playlistTracks.map((t) => [t.id, t]));

    const trackIdsToAdd: number[] = [...favoriteTracksMap.keys()].filter((trackId) => !playlistTracksMap.has(trackId));
    const trackIdsToRemove: number[] = [...playlistTracksMap.keys()].filter((trackId) => !favoriteTracksMap.has(trackId));

    await dezeerService.playlistEntity.addTracks(playlistId, trackIdsToAdd);
    await dezeerService.playlistEntity.removeTracks(playlistId, trackIdsToRemove);
    await dezeerService.playlistEntity.orderTracks(playlistId, [...favoriteTracksMap.keys()]);

    return { trackIdsAdded: trackIdsToAdd, trackIdsRemoved: trackIdsToRemove };
}

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    console.log('event', JSON.stringify(event));
    const accessToken = requireQueryStringParameter(event, 'accessToken');
    const playlistId = requireQueryNumberParameter(event, 'playlistId');
    const result = await favoritesToPlaylist(accessToken, playlistId);

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};
