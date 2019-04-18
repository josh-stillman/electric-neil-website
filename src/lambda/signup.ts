import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
// import { MongoClient, MongoClientOptions, DbCollectionOptions, ReadPreference, Db } from 'mongodb';
import { MongoClient } from 'mongodb';
import { getDbName } from '../utils';
import Subscription from '../services/Subscription';


exports.handler = async (event: APIGatewayEvent, context: Context) => {
  // console.log('queryStringParameters', event.queryStringParameters);
  const body = event.body && JSON.parse(event.body);
  if (!body || !body.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'bad request' }),
    };
  }

  // 1. insert record (confirmed === false)
  //2. send email with mongo id.
  // return success msg

  //if email error, return email error msg.



  // const connection = await MongoClient.connect(process.env.MONGO_URL || '');
  // const ndb = await connection.db(getDbName());

  // const subs = await ndb.collection('subscribers');



  // let newRecord;

  // try {
  //   newRecord = await subs.insertOne({
  //     email: body.email,
  //     createdAt: new Date().toISOString(),
  //     confirmed: false,
  //   });
  // } catch (e) {
  //   callback(null, {
  //     statusCode: 400,
  //     body: JSON.stringify({ message: `A subscriber with that email address already exists.  Try another address.` }),
  //   });
  //   await connection.close();
  //   return;
  // }

  const handler = new Subscription();

  const response = await handler.add(body.email)



  console.log("new record is", response)
  // check if already exists;


  const id = response[1];

  // insertedId
  // const list = await subs.find({}).toArray();
  // console.log("hey", list)

  // await connection.close();
  // callback(null, {
  //   statusCode: response[0],
  //   body: JSON.stringify({ message: `email success with id of ${id}` }),
  // });
  return {
    statusCode: response[0],
    body: JSON.stringify({ message: `email success with id of ${id}` }),
  };
};
