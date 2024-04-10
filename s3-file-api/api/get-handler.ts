import { Handler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// CDN URL prefix env var will be set in serverless.yml file
const CDN_URL_PREFIX = process.env.AWS_CLOUDFRONT_CDN_URL;

export const lambdaHandler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: '',
    };

    try {
        if (event.pathParameters && event.pathParameters.fileKey) {
            const fileKey = decodeURIComponent(event.pathParameters.fileKey);
            // Construct the CDN URL for the file
            const fileUrl = `${CDN_URL_PREFIX}/${fileKey}`;

            // Optionally log the redirect URL for auditing purposes
            console.log(`File URL: ${fileUrl}`);

            // Return a JSON response including the message and the file URL
            response.body = JSON.stringify({
                message: "File retrieved successfully.",
                url: fileUrl,
            });

        } else {
            // No fileKey provided in the request
            response.statusCode = 400; // Bad Request
            response.body = JSON.stringify({ message: "File key is missing in the request." });
        }
    } catch (e: any) {
        console.error(e);
        response.body = JSON.stringify({ message: "Failed to get file.", errorMessage: e.toString() });
        response.statusCode = 500; // Internal Server Error
    }

    return response;
};
