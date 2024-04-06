# Serverless Cloud APIs: Integrated AWS Lambda, S3, DynamoDB, and API Gateway

## Overview

This project takes a serverless architecture approach to build a comprehensive API that not only performs CRUD operations on DynamoDB but also integrates with S3 for object storage capabilities. Leveraging AWS Lambda functions and API Gateway, the API facilitates creating, reading, updating, and deleting posts stored in a DynamoDB table, alongside managing file uploads to S3. 

Designed with scalability, security, and ease of maintenance at its core, it features a GitHub Actions CI/CD pipeline for automating testing, building, and deployment processes, ensuring smooth integration and continuous delivery.

## Features

- **CRUD Operations**: Supports create, read, update, and delete operations on DynamoDB.
- **Serverless Framework**: Utilizes the Serverless Framework for easy deployment and management.
- **S3 Object Store**: Supports upload, retrieve, and manage files in an S3 bucket directly through the APIs.
- **CI/CD with GitHub Actions**: Automated workflows for continuous integration and continuous deployment.
- **TypeScript with Node.js on AWS**: Manual integration of TypeScript with plugins to allow modern code to run on AWS Lambda.

## Dependencies Overview

This project utilizes AWS services, specifically DynamoDB, through AWS Lambda and API Gateway, facilitated by a set of dependencies outlined below.

### Runtime Dependencies

- **@aws-sdk/client-dynamodb** - Enables interaction with DynamoDB for CRUD operations.
- **@aws-sdk/util-dynamodb** - Provides utility functions for easier DynamoDB data manipulation.
- **@types/aws-lambda** - Type definitions for AWS Lambda, aiding in function development.
- **aws-sdk** - Amazon Web Services SDK for JavaScript, allowing AWS service interactions.
- **serverless** - A framework for building and deploying serverless applications.
- **serverless-dynamodb** - Facilitates local DynamoDB emulation for development and testing.

### Development Dependencies

- **@types/node** - Type definitions for Node.js.
- **serverless-iam-roles-per-function** - Enables granular IAM role definitions at the Lambda function level.
- **serverless-offline** - Simulates AWS Lambda and API Gateway locally for development.
- **serverless-plugin-typescript** - Compiles TypeScript projects in Serverless applications.
- **typescript** - A typed superset of JavaScript that compiles to plain JavaScript, enhancing development.

## Requirements

- AWS Account
- AWS CLI configured with Administrator access
- Node.js (v20.x or later)
- Serverless Framework

## Local Testing

Local testing is done by using serverless offline. The following commands can be run to setup:

### DynamoDB
1) cd dynamodb-crud-api
2) npm i
3) sls dynamodb install
4) sls offline start

### Amazon s3
TBD

## Serverless Architecture Diagram
![Serverless Architecture Diagram](https://github.com/StevenD24/Serverless-DynamoDB-Lambda-API/assets/105379503/d2510d78-92da-4001-8c6d-d19e27c2fc4d)

