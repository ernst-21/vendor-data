import {
	dynamodbCreateTable,
	dynamodbDeleteTable,
	dynamodbDescribeTable,
} from './aws';

const init = async () => {
	const vendorsTableName = 'vendors';

	// const vendorTableParams: AWS.DynamoDB.CreateTableInput = {
	// 	TableName: vendorsTableName,
	// 	KeySchema: [{ AttributeName: 'twitterId', KeyType: 'HASH' }],
	// 	AttributeDefinitions: [{ AttributeName: 'twitterId', AttributeType: 'S' }],
	// 	ProvisionedThroughput: {
	// 		ReadCapacityUnits: 10,
	// 		WriteCapacityUnits: 10,
	// 	},
	// };
	//dynamodbCreateTable(vendorTableParams);
	//await dynamodbCreateTable(vendorTableParams);

	const vendorsTable = await dynamodbDescribeTable(vendorsTableName);
	await dynamodbDescribeTable(vendorsTableName);

	if (!(vendorsTable instanceof Error)) {
		// DELETE TABLE
		await dynamodbDeleteTable(vendorsTableName);
	}
};

init();
