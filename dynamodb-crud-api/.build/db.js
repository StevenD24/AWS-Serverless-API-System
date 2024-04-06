"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({
    region: "us-west-1",
    credentials: {
        accessKeyId: "access_key_id",
        secretAccessKey: "secret_access_key_id",
    },
    endpoint: "http://localhost:8000"
});
exports.default = client;
//# sourceMappingURL=db.js.map