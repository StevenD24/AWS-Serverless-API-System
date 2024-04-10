import { Handler, APIGatewayProxyResult } from "aws-lambda";

// CDN URL prefix env var will be set in serverless.yml file
const CDN_URL_PREFIX = process.env.AWS_CLOUDFRONT_CDN_URL; 

export const lambdaHandler: Handler = async (event): Promise<APIGatewayProxyResult> => {
    // Default response structure
    const response: APIGatewayProxyResult = { 
        statusCode: 200,
        headers: {},
        body: '',
    };

    try {
        // Ensure pathParameters and fileKey exist
        if (event.pathParameters && event.pathParameters.fileKey) {
            const fileKey = decodeURIComponent(event.pathParameters.fileKey);
            // Construct the CDN URL for the file
            const fileUrl = `${CDN_URL_PREFIX}/${fileKey}`;

            // log the redirect for auditing purposes
            console.log(`Redirecting to: ${fileUrl}`);

            // Set up a 302 redirect to the CDN URL
            response.statusCode = 302;
            response.headers = {
                Location: fileUrl,
                // Cache the redirect for a short time to reduce lambda invocations
                'Cache-Control': 'max-age=60', // Example: 60 seconds
            };
        } else {
            // No fileKey provided in the request
            response.statusCode = 400; // Bad Request
            response.body = JSON.stringify({ message: "File key is missing in the request." });
        }

    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({ message: "An error occurred.", errorMessage: e.toString() });
        response.statusCode = 500; // Internal Server Error
    }

    return response;
};
