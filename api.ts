import { Handler } from 'aws-lambda';
import db from "./db";
import { 
    GetItemCommand, 
    PutItemCommand, 
    DeleteItemCommand, 
    UpdateItemCommand, 
    ScanCommand 
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const getPost: Handler = async (event: any) => {
    const response: { statusCode: number, body?: string } = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ postId: event.pathParameters.postId }),
        };
        const { Item } = await db.send(new GetItemCommand(params));

        console.log({ Item });
        response.body = JSON.stringify({
            message: "Successfully retrieved post.",
            data: (Item) ? unmarshall(Item) : {},
            rawData: Item,
        });
    } catch (e: any) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to get post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const createPost: Handler = async (event: any) => {
    const response: { statusCode: number, body?: string } = { statusCode: 200 };

    try {
        const body = JSON.parse(event.body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(body || {}),
        };
        const createResult = await db.send(new PutItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully created post.",
            createResult,
        });
    } catch (e: any) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to create post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const updatePost: Handler = async (event: any) => {
    const response: { statusCode: number, body?: string } = { statusCode: 200 };

    try {
        const body = JSON.parse(event.body);
        const objKeys = Object.keys(body);
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ postId: event.pathParameters.postId }),
            // "UpdateExpression" : "SET #attrName =:attrValue",
            // "ExpressionAttributeNames" : {
            //     "#attrName" : "SessionID"
            // },
            // "ExpressionAttributeValues" : {
            //     ":attrValue" : {
            //         "S" : "some string"
            //     }
            // }
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`)}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`] : key,
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`:value${index}`] : body[key],
            }), {})),
        };
        const updateResult = await db.send(new UpdateItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully updated post.",
            updateResult,
        });
    } catch (e: any) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to update post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const deletePost: Handler = async (event: any) => {
    const response: { statusCode: number, body?: string } = { statusCode: 200 };

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({ postId: event.pathParameters.postId }),
        };
        const deleteResult = await db.send(new DeleteItemCommand(params));

        response.body = JSON.stringify({
            message: "Successfully deleted post.",
            deleteResult,
        });
    } catch (e: any) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to delete post.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

const getAllPosts: Handler = async () => {
    const response: { statusCode: number, body?: string } = { statusCode: 200 };

    try {
        const { Items } = await db.send(new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME } ));

        response.body = JSON.stringify({
            message: "Successfully retrieved all posts.",
            data: Items!.map((item: any) => unmarshall(item)),
            Items,
        });
    } catch (e: any) {
        console.log(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to retrieve all posts.",
            errorMsg: e.message,
            errorStack: e.stack,
        });
    }

    return response;
};

export { getPost, createPost, updatePost, deletePost, getAllPosts };