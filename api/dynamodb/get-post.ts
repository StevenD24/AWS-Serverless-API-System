import { Handler } from 'aws-lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import db from "../../db";
import { 
    GetItemCommand
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export const lambdaHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const response: { statusCode: number, body?: string } = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ postId: event.pathParameters!.postId }),
        };
        const { Item } = await db.send(new GetItemCommand(params));

        console.log({ Item });
        response.body = JSON.stringify({
            message: "Successfully retrieved post.",
            data: (Item) ? unmarshall(Item) : {},
            rawData: Item,
        });
    } catch (e: any) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to get post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response as APIGatewayProxyResult;
};