import { Handler } from 'aws-lambda';
import https from 'https';

export const handler: Handler = async (event, _context, callback) => {
    try {
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

        return callback(null, {
            statusCode: 400,
            body: 'Request to counter was failed',
        });
    } catch (err) {
        console.log('get-counter fail');
        return callback(err);
    }
};
