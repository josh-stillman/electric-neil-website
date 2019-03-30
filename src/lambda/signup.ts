import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
// import { MongoClient, MongoClientOptions, DbCollectionOptions, ReadPreference, Db } from 'mongodb';
import { MongoClient } from 'mongodb';
import { getDbName } from '../utils';


exports.handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  // console.log('queryStringParameters', event.queryStringParameters);
  const body = JSON.parse(event.body);
  if (!body || !body.email) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'bad request' }),
    });
    return;
  }

  // 1. insert record (confirmed === false)
  //2. send email with mongo id.
  // return success msg

  //if email error, return email error msg.



  const connection = await MongoClient.connect(process.env.MONGO_URL || '');
  const ndb = await connection.db(getDbName());

  const subs = await ndb.collection('subscribers');



  let newRecord;

  try {
    newRecord = await subs.insertOne({
      email: body.email,
      createdAt: new Date().toISOString(),
      confirmed: false,
    });
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: `A subscriber with that email address already exists.  Try another address.` }),
    });
    await connection.close();
    return;
  }

  console.log("new record is", newRecord)
  const id = newRecord.insertedId.toHexString();
  // check if already exists;




  // insertedId
  // const list = await subs.find({}).toArray();
  // console.log("hey", list)

  await connection.close();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: `email success with id of ${id}` }),
  });
};
