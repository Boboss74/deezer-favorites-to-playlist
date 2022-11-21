import { APIGatewayProxyEventV2, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { DeezerAuth } from '../service/deezerAuth';
import { requireQueryStringParameter } from '../util/apiGateway';

interface GetAccessTokenResponse {
    accessToken: string;
    expiresAt: string;
}

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    console.log('event', JSON.stringify(event));
    const code = requireQueryStringParameter(event, 'code');
    const { access_token: accessToken, expiresAt } = await DeezerAuth.getAccessTokenData(code);

    const response: GetAccessTokenResponse = {
        accessToken,
        expiresAt: expiresAt.toISOString(),
    };

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
