import { APIGatewayEvent, Context } from 'aws-lambda';
import Subscription from './services/Subscription';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.handler = async (event: APIGatewayEvent, context: Context) => {
  const body = event.body && JSON.parse(event.body);

  if (!body || !body.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'bad request' }),
    };
  }

  const handler = new Subscription({ context: body.context });

  const response = await handler.unsubscribe(body.id);

  return {
    statusCode: response[0],
    body: JSON.stringify({ message: response[1] || '' }),
  };
};
