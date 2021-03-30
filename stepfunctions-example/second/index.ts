import { Handler } from 'aws-lambda';
import https from 'https';

export const handler: Handler = async (event, context, callback) => {
    console.log(event); // Contains incoming request data (e.g., query params, headers and more)

    const req = https.request(
        'https://h8vinucw27.execute-api.ap-northeast-1.amazonaws.com/dev/test/get',
        (res) => {
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
                return callback(null, {
                    statusCode: 200,
                    body: rawData,
                });
            });
        }
    );

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();

    const response = {
        statusCode: 200,
        body: 'from second Func',
    };

    return callback(null, response);
};
