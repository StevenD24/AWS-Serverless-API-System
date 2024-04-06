import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; // aws-sdk V3

// Determine if running offline based on the IS_OFFLINE environment variable
const isOffline = process.env.IS_OFFLINE === 'true';

// config for cloud and offline servers
const config = isOffline ? {
        region: "us-west-1",
        credentials: {
            accessKeyId: "MockAccessKeyId",
            secretAccessKey: "MockSecretAccessKey",
        },
        endpoint: "http://localhost:8000",
    } : {};

const dbclient = new DynamoDBClient(config);

export default dbclient;