import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import Subscription from '../services/Subscription';


exports.handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const body = event.body && JSON.parse(event.body);

  if (!body || !body.id) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'bad request' }),
    });
    return;
  }

  const handler = new Subscription();

  const response = await handler.confirm(body.id)

  callback(null, {
    statusCode: response[0],
    body: JSON.stringify({ message: response[1] || '' }),
  });
};
