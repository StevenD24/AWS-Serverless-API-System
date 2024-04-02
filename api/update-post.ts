import { Handler } from 'aws-lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import db from "../db";
import { 
    UpdateItemCommand
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export const lambdaHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const response: { statusCode: number, body?: string } = { statusCode: 200 };

    try {
        const body = JSON.parse(event.body!);
        const objKeys = Object.keys(body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ postId: event.pathParameters!.postId }),
            // "UpdateExpression" : "SET #attrName =:attrValue",
            // "ExpressionAttributeNames" : {
            //     "#attrName" : "SessionID"
            // },
            // "ExpressionAttributeValues" : {
            //     ":attrValue" : {
            //         "S" : "some string"
            //     }
            // }
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`)}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`] : key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`] : body[key],
            }), {})),
        };
        const updateResult = await db.send(new UpdateItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully updated post.",
            updateResult,
        });
    } catch (e: any) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to update post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response as APIGatewayProxyResult;
};