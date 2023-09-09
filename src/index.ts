import {
	dynamodbCreateTable,
	dynamodbDeleteTable,
	dynamodbDescribeTable,
	dynamodbCreateRecord,
} from './aws';
import vendors from './data/vendors';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const init = async () => {
	const vendorsTableName = 'vendors';

	const vendorsTable = await dynamodbDescribeTable(vendorsTableName);

	if (!(vendorsTable instanceof Error)) {
		// DELETE TABLE
		await dynamodbDeleteTable(vendorsTableName);
		await delay(6000);
	}

	const vendorTableParams: AWS.DynamoDB.CreateTableInput = {
		TableName: vendorsTableName,
		KeySchema: [{ AttributeName: 'twitterId', KeyType: 'HASH' }],
		AttributeDefinitions: [{ AttributeName: 'twitterId', AttributeType: 'S' }],
		ProvisionedThroughput: {
			ReadCapacityUnits: 10,
			WriteCapacityUnits: 10,
		},
	};

	await dynamodbCreateTable(vendorTableParams);
	await delay(6000);

	const firstVendor = vendors[0];
	await dynamodbCreateRecord(vendorsTableName, firstVendor);
};

init();
