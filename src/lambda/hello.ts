import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

exports.handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  console.log('queryStringParameters', event.queryStringParameters);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: process.env.MESSAGE || 'nothin here' }),
  });
};
