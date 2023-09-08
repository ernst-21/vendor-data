import AWS from 'aws-sdk';
import { AWSRegions } from './types/aws';

AWS.config.update({ region: AWSRegions.US_EAST_1 });

const { DynamoDB } = AWS;

const dynamodb = new DynamoDB();

// create a table
export const dynamodbCreateTable = async (
	params: AWS.DynamoDB.CreateTableInput
) => {
	try {
		const result = await dynamodb.createTable(params).promise();
		console.log('Table Created', result);

		return result;
	} catch (error: any) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error(
			`dynamodbCreateTable error object unknown type: ${error.message}`
		);
	}
};

// describe a table
export const dynamodbDescribeTable = async (tableName: string) => {
	try {
		const table = await dynamodb
			.describeTable({ TableName: tableName })
			.promise();
		console.log('Table retrieved', table);
		return table;
	} catch (error: any) {
		if (error instanceof Error) {
			return error;
		}
		throw new Error(
			`dynamodbDescribeTable error object unknown type: ${error.message}`
		);
	}
};
// delete a table
export const dynamodbDeleteTable = async (tableName: string) => {
	try {
		const result = await dynamodb
			.deleteTable({ TableName: tableName })
			.promise();
		console.log('Table deleted ', result);
		return result;
	} catch (error: any) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error(
			`dynamodbDeleteTable error object unknown type: ${error.message}`
		);
	}
};

// create a record
