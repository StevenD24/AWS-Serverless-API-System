import { Handler } from "aws-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

// bucket name env var will be set in serverless.yml file
const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

export const lambdaHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>=> {

    const response: { isBase64Encoded:boolean, statusCode: number, body?: string } = { 
        isBase64Encoded: false,
        statusCode: 200,
    }
    console.log(event);

    try {
        const parsedBody = JSON.parse(event.body);
        const base64File = parsedBody.file;
        const decodedFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ""), "base64");
        const params = {
            Bucket: BUCKET_NAME,
            Key: parsedBody.fileKey,
            Body: decodedFile,
            ContentType: "image/jpeg",
        };
        const uploadResult = await s3.upload(params).promise();

        response.body = JSON.stringify({ message: "Successfully uploaded file to S3", uploadResult });
    } catch (e) {
        console.error("Failed to upload file: ", e);
        response.body = JSON.stringify({ message: "File failed to upload.", errorMessage: e });
        response.statusCode = 500;
    }

    return response as APIGatewayProxyResult;
};
