import { APIGatewayProxyEventV2 } from 'aws-lambda';

export function requireQueryStringParameter(event: APIGatewayProxyEventV2, name: string) {
    const value = event.queryStringParameters?.[name];
    if (value) {
        return value;
    } else {
        throw new Error(`Missing required queryStringParameter ${name}`);
    }
}

export function requireQueryNumberParameter(event: APIGatewayProxyEventV2, name: string) {
    const value = event.queryStringParameters?.[name];
    const number = Number(value);
    if (value !== undefined && value !== '' && Number.isFinite(number)) {
        return number;
    } else {
        throw new Error(`Missing required queryStringParameter ${name}`);
    }
}
