import {
    SESClient,
    SendEmailCommand,
    type SendEmailCommandInput,
} from '@aws-sdk/client-ses'
import { config } from '../../config.js'

// ----------------------- types -----------------------
export type SendEmailParams = {
    to: string
    token: string
}

// ----------------------- constants -----------------------
const SOURCE = 'zakra.guad.app'

const sesClient = new SESClient({
    credentials: {
        accessKeyId: config.aws.acessKeyId,
        secretAccessKey: config.aws.acessKeySecret,
    },
    region: config.aws.region,
})

// ----------------------- public api -----------------------

export async function sendVerificationEmail(
    params: SendEmailParams
): Promise<void> {
    const input: SendEmailCommandInput = {
        Source: SOURCE,
        Destination: {
            ToAddresses: [params.to],
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: 'Email Verification Link',
            },
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `To verify the mail open the link http://localhost:3000/api/identity/verify/${params.token}`,
                },
            },
        },
    }

    const command = new SendEmailCommand(input)
    await sesClient.send(command)
}
