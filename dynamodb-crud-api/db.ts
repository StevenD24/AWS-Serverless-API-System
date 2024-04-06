import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


const client = new DynamoDBClient({
    region: "us-west-1",
    credentials: {
        accessKeyId: "access_key_id",
        secretAccessKey: "secret_access_key_id",
    },
    endpoint: "http://localhost:8080"
});

export default client;
