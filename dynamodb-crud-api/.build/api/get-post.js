"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const db_1 = require("../db");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const lambdaHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const response = { statusCode: 200 };
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: (0, util_dynamodb_1.marshall)({ postId: event.pathParameters.postId }),
        };
        const { Item } = yield db_1.default.send(new client_dynamodb_1.GetItemCommand(params));
        console.log({ Item });
        response.body = JSON.stringify({
            message: "Successfully retrieved post.",
            data: (Item) ? (0, util_dynamodb_1.unmarshall)(Item) : {},
            rawData: Item,
        });
    }
    catch (e) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to get post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }
    return response;
});
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=get-post.js.map