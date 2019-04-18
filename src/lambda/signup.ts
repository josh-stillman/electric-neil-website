import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
// import { MongoClient, MongoClientOptions, DbCollectionOptions, ReadPreference, Db } from 'mongodb';
import { MongoClient } from 'mongodb';
import { getDbName } from './utils';
import Subscription from './services/Subscription';


exports.handler = async (event: APIGatewayEvent, context: Context) => {
  const body = event.body && JSON.parse(event.body);
  if (!body || !body.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'bad request' }),
    };
  }

  const handler = new Subscription();

  const response = await handler.add(body.email)

  const id = response[1];

  return {
    statusCode: response[0],
    body: JSON.stringify({ message: `email success with id of ${id}` }),
  };
};
