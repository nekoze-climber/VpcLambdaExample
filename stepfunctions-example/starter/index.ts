import { Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import StateMachine from '../aws/stateMachine';

AWS.config.apiVersions = {
    stepfunctions: '2016-11-23',
    // other service API versions
};
const stepfunctions = new AWS.StepFunctions();

export const handler: Handler = async (event, context, callback) => {
    console.log(event); // Contains incoming request data (e.g., query params, headers and more)

    const stateMachine = new StateMachine(stepfunctions);
    await stateMachine.startExecution(JSON.stringify(event));
    const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'StateMachie Execute Success!!' }),
    };

    return callback(null, response);
};
