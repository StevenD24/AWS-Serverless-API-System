import { Handler } from "aws-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

// bucket name env var will be set in serverless.yml file
const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

export const lambdaHandler: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  // The output from a Lambda proxy integration must be
  // in the following JSON object. The 'headers' property
  // is for custom response headers in addition to standard
  // ones. The 'body' property must be a JSON string. For
  // base64-encoded payload, you must also set the 'isBase64Encoded'
  // property to 'true'.
  const response: APIGatewayProxyResult = {
    isBase64Encoded: false,
    statusCode: 200,
    body: JSON.stringify({}),
  };

  try {
    const parsedBody = JSON.parse(event.body);
    const base64File = parsedBody.file;
    const decodedFile = Buffer.from(
      base64File.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    if (!BUCKET_NAME) {
      throw new Error("Bucket name is not set in environment variables");
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: parsedBody.fileKey,
      Body: decodedFile,
      ContentType: "image/jpeg",
    };
    
    const uploadResult = await s3.upload(params).promise();

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Successfully uploaded file to S3",
        uploadResult,
      }),
    };
  } catch (e) {
    console.error("Failed to upload file: ", e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "File failed to upload.",
        errorMessage: e,
      }),
    };
  }
};
