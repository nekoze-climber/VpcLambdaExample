import * as AWS from 'aws-sdk';

export default class StateMachine {
    client: AWS.StepFunctions;

    constructor(serviceClient: AWS.StepFunctions) {
        this.client = serviceClient;
    }

    async startExecution(payload: string) {
        const params = {
            input: payload,
            stateMachineArn: process.env.STATE_MACHINE_ARN,
        };
        return new Promise((resolve, reject) => {
            this.client.startExecution(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('succeeded to invoke step functions!');
                    resolve(data);
                }
            });
        });
    }
}
