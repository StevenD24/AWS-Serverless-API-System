# Serverless DynamoDB API with AWS Lambda and API Gateway

## Overview

This project takes a serverless architecture approach to build a comprehensive API that not only performs CRUD operations on DynamoDB but also integrates with S3 for object storage capabilities. Leveraging AWS Lambda functions and API Gateway, the API facilitates creating, reading, updating, and deleting posts stored in a DynamoDB table, alongside managing file uploads to S3. 

Designed with scalability, security, and ease of maintenance at its core, it features a GitHub Actions CI/CD pipeline for automating testing, building, and deployment processes, ensuring smooth integration and continuous delivery.

## Features

- **CRUD Operations**: Supports create, read, update, and delete operations on DynamoDB.
- **Serverless Framework**: Utilizes the Serverless Framework for easy deployment and management.
- **S3 Object Store**: Supports upload, retrieve, and manage files in an S3 bucket directly through the APIs.
- **CI/CD with GitHub Actions**: Automated workflows for continuous integration and continuous deployment.

## Requirements

- AWS Account
- AWS CLI configured with Administrator access
- Node.js (v20.x or later)
- Serverless Framework

## Serverless Architecture Diagram
![Serverless Architecture Diagram](https://github.com/StevenD24/Serverless-DynamoDB-Lambda-API/assets/105379503/d2510d78-92da-4001-8c6d-d19e27c2fc4d)

