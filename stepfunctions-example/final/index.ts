import { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context, callback) => {
    console.log(event); // Contains incoming request data (e.g., query params, headers and more)

    const response = {
        statusCode: 200,
        body: 'finish!!',
    };

    return callback(null, response);
};
