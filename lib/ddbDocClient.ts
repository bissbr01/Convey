import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY ?? '',
    secretAccessKey: process.env.SECRET_KEY ?? '',
  },
  region: process.env.REGION,
});

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export { ddbDocClient };
