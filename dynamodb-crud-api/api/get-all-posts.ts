import { Handler } from 'aws-lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import db from "../db";
import { 
    ScanCommand
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const lambdaHandler: Handler = async (): Promise<APIGatewayProxyResult> => {
    const response: { statusCode: number, body?: string } = { statusCode: 200 };

    try {
        const { Items } = await db.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME } ));

        response.body = JSON.stringify({
            message: "Successfully retrieved all posts.",
            data: Items!.map((item: any) => unmarshall(item)),
            Items,
        });
    } catch (e: any) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to retrieve all posts.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response as APIGatewayProxyResult;
};