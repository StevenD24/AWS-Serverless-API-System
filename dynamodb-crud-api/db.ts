import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: {
        accessKeyId: "MockAccessKeyId",
        secretAccessKey: "MockSecretAccessKey",
    },
    endpoint: "http://localhost:8000"
});

export default client;
