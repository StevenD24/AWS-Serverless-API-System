import { Handler } from "aws-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

// bucket name env var will be set in serverless.yml file
const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

export const lambdaHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const response: { isBase64Encoded:boolean, statusCode: number, body?: string } = { 
        isBase64Encoded: false,
        statusCode: 200,
    }

    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: decodeURIComponent(event.pathParameters.fileKey),
        }
        const data = await s3.getObject(params).promise();
        response.body = JSON.stringify({ message: "Successfull retrieved file from S3.", data });

    } catch (e: any) {
        console.error(e);
        response.body = JSON.stringify({ message: "Failed to get file.", errorMessage: e });
        response.statusCode = 500;
    }

    return response as APIGatewayProxyResult;
};
