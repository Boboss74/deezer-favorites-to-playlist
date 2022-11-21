import { APIGatewayProxyEventV2, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { DezeerService } from '../service/deezer';
import { requireQueryStringParameter } from '../util/apiGateway';

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    console.log('event', JSON.stringify(event));
    const accessToken = requireQueryStringParameter(event, 'accessToken');
    const dezeerService = DezeerService.init(accessToken);
    const favoriteTracks = await dezeerService.trackEntity.getFavoriteTracks();

    return {
        statusCode: 200,
        body: JSON.stringify(favoriteTracks),
    };
};
