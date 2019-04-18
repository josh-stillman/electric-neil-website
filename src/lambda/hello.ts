import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
// import { MongoClient, MongoClientOptions, DbCollectionOptions, ReadPreference, Db } from 'mongodb';
import { MongoClient } from 'mongodb';
import { getDbName } from '../utils';

exports.handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  console.log('queryStringParameters', event.queryStringParameters);

  const connection = await MongoClient.connect(process.env.MONGO_URL || '');
  const ndb = await connection.db(getDbName());
  console.log("db is", ndb)

  const subs = await ndb.collection('subscribers');
  const list = await subs.find({}).toArray();
  console.log("hey", list)

  await connection.close();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: process.env.MESSAGE || 'nothin here' }),
  });
};
