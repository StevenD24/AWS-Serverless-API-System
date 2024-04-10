# Serverless Cloud APIs: Integrated AWS Lambda, S3, DynamoDB, and API Gateway

## Overview

This project leverages a serverless architecture to develop a comprehensive API that performs CRUD operations on DynamoDB and incorporates S3 for object storage, facilitated by AWS Lambda functions and API Gateway. The API enables the creation, reading, updating, and deletion of data within DynamoDB, alongside managing file uploads to S3. With the integration of AWS CloudFront as a CDN for S3 file retrieval, the architecture significantly reduces latency, ensuring faster access to files globally.

In this serverless architecture, Lambda authorizers and Auth0 are used for secure API access, ensuring secure access control and restricting operations to authorized users only.

To streamline development and deployment, the project incorporates a GitHub Actions CI/CD pipeline, automating testing, building, and deployment processes. It utilizes the Serverless Framework alongside AWS CloudFormation, simplifying the deployment and management of serverless applications and ensuring efficient, continuous delivery.

## Features

- **CRUD Operations**: Supports create, read, update, and delete operations on DynamoDB.
- **Serverless Framework**: Utilizes the Serverless Framework for easy deployment and management.
- **S3 Object Store**: Supports upload, retrieve, and manage files in an S3 bucket directly through the APIs.
- **AWS CloudFront CDN Integration**: Utilizes AWS CloudFront as a CDN for efficient and low-latency file retrieval from S3, optimizing content delivery globally.
- **CI/CD with GitHub Actions**: Automated workflows for continuous integration and continuous deployment.
- **TypeScript with Node.js on AWS**: Manual integration of TypeScript with plugins to allow modern code to run on AWS Lambda.
- **Auth0 Integration**: Uses Auth0 for secure authentication and authorization with a Bearer JWT.
- **Lambda Authorizer**: Implements a Lambda authorizer for API Gateway to manage access control.

## Dependencies Overview

This project utilizes AWS services, specifically DynamoDB, through AWS Lambda and API Gateway, facilitated by a set of dependencies outlined below.

### Runtime Dependencies

- **[@aws-sdk/client-dynamodb](https://www.npmjs.com/package/@aws-sdk/client-dynamodb)** - Enables interaction with DynamoDB for CRUD operations.
- **[@aws-sdk/util-dynamodb](https://www.npmjs.com/package/@aws-sdk/util-dynamodb)** - Provides utility functions for easier DynamoDB data manipulation.
- **[@types/aws-lambda](https://www.npmjs.com/package/@types/aws-lambda)** - Type definitions for AWS Lambda, aiding in function development.
- **[aws-sdk](https://www.npmjs.com/package/aws-sdk)** - Amazon Web Services SDK for JavaScript, allowing AWS service interactions.
- **[serverless](https://www.npmjs.com/package/serverless)** - A framework for building and deploying serverless applications.
- **[serverless-dynamodb](https://www.npmjs.com/package/serverless-dynamodb)** - Facilitates local DynamoDB emulation for development and testing.

### Development Dependencies

- **[@types/node](https://www.npmjs.com/package/@types/node)** - Type definitions for Node.js.
- **[serverless-iam-roles-per-function](https://www.npmjs.com/package/serverless-iam-roles-per-function)** - Enables granular IAM role definitions at the Lambda function level.
- **[serverless-offline](https://www.npmjs.com/package/serverless-offline)** - Simulates AWS Lambda and API Gateway locally for development.
- **[serverless-plugin-typescript](https://www.npmjs.com/package/serverless-plugin-typescript)** - Compiles TypeScript projects in Serverless applications.
- **[typescript](https://www.npmjs.com/package/typescript)** - A typed superset of JavaScript that compiles to plain JavaScript, enhancing development.

## Requirements

- [AWS Account](https://aws.amazon.com/console/)
- [Node.js (v20.x or later)](https://nodejs.org/en)
- [AWS SDK V3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)
- [Auth0 Account](https://auth0.com/)
- AWS CLI configured with Administrator access
- Serverless Framework
- Secret AWS and Auth0 keys

## Local Testing

Local testing is done by using serverless offline, configurations are included in the `serverless.yml` files.

### DynamoDB
To set up a local testing environment for DynamoDB, follow these steps:
1) `cd dynamodb-crud-api`
2) `npm install`
3) `sls dynamodb install`
4) `sls offline start`

### Amazon s3
TBD

## Additional Documentation
- [GitHub Actions](https://docs.github.com/en/actions/quickstart)
- [Serverless HTTP API Events](https://www.serverless.com/framework/docs-providers-aws-events-http-api)
- [AWS CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

## Serverless Architecture Diagram
![Serverless Architecture Project](https://github.com/StevenD24/AWS-Serverless-API-System/assets/105379503/3ff43a7f-ae03-4fd3-85da-0c353b081fab)




