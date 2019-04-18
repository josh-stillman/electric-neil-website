import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import Subscription from './services/Subscription';


exports.handler = async (event: APIGatewayEvent, context: Context) => {
  const body = event.body && JSON.parse(event.body);

  if (!body || !body.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'bad request' }),
    };
    return;
  }

  const handler = new Subscription();

  const response = await handler.unsubscribe(body.id)

  return {
    statusCode: response[0],
    body: JSON.stringify({ message: response[1] || '' }),
  };
};
