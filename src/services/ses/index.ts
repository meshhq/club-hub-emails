// External Dependencies
import { SES, AWSError } from 'aws-sdk'
import to from 'await-to-js'
import { contains } from 'underscore'

// Interfaces
import * as ISesService from './types'

const CHARSET_UTF_8 = 'UTF-8'
const SES_REGION = 'us-west-2'

// SES Error Names
export const MESSAGE_REJECTED = 'MessageRejected'

/**
 * Class containing AWS SES (email) logic.
 * NOTE:
 * - AWS returns type 'PromiseResult' from their methods. Casting to Promise<any> to avoid using this type.
 */
export default class SESService {

	public static sharedInstance(): SES {
		if (!this._sharedInstance) {
			const credentials = {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
			}

			this._sharedInstance = new this({
				credentials: credentials.accessKeyId ? credentials : undefined,
				region: SES_REGION
			})
		}
		return this._sharedInstance.sns
	}

	/**
	 * Sends an email.
	 */
	public static sendEmail = async (source: string, recipients: string[], ccAddresses: string[], subject: string, body: string): Promise<ISesService.EmailRes> => {
		const methodName = '[sendEmail] -'

		// Validate params.
		if (source === '' || !recipients.length || subject === '' || body === '') {
			const errMsg = 'failed to send email because of missing params'
			throw new Error(errMsg)
		}

		const emailParams = SESService.createEmailParams(source, recipients, ccAddresses, subject, body)
		const sendEmailPromise = SESService.sharedInstance().sendEmail(emailParams).promise() as Promise<any>
		const [emailErr, res] = await to<ISesService.EmailRes, AWSError>(sendEmailPromise)
		if (emailErr) {
			throw emailErr
		}

		return res!
	}

	/**
	 * Sends an email.
	 */
	public static sendHTMLEmail = async (source: string, recipients: string[], ccAddresses: string[], bccAddresses: string[], subject: string, html: string): Promise<ISesService.EmailRes> => {
		const methodName = '[sendEmail] -'

		// Validate params.
		if (source === '' || !recipients.length || subject === '' || html === '') {
			const errMsg = 'failed to send email because of missing params'
			throw new Error(errMsg)
		}

		const emailParams = SESService.createHTMLEmailParams(source, recipients, ccAddresses, bccAddresses, subject, html)
		const sendEmailPromise = SESService.sharedInstance().sendEmail(emailParams).promise() as Promise<any>
		const [emailErr, res] = await to<ISesService.EmailRes, AWSError>(sendEmailPromise)
		if (emailErr) {
			throw emailErr
		}
		return res!
	}

	private static _sharedInstance: SESService

	/**
	 * Returns a formatted email object.
	 * We can also send raw HTMl in the message body.
	 * The ISesService.EmailPayload interface shows where to add this.
	 */
	private static createEmailParams = (source: string, recipients: string[], ccAddresses: string[], subject: string, html: string): ISesService.EmailPayload => {
		return {
			Destination: {
				CcAddresses: ccAddresses,
				ToAddresses: recipients
			},
			Message: {
				Body: {
					Text: {
						Charset: CHARSET_UTF_8,
						Data: html
					}
				},
				Subject: {
					Charset: CHARSET_UTF_8,
					Data: subject
				}
			},
			Source: source
		}
	}

	private static createHTMLEmailParams = (source: string, recipients: string[], ccAddresses: string[], bccAddresses: string[], subject: string, body: string): ISesService.EmailPayload => {
		return {
			Destination: {
				CcAddresses: ccAddresses,
				ToAddresses: recipients,
				BccAddresses: bccAddresses
			},
			Message: {
				Body: {
					Html: {
						Charset: CHARSET_UTF_8,
						Data: body
					}
				},
				Subject: {
					Charset: CHARSET_UTF_8,
					Data: subject
				}
			},
			Source: source
		}
	}

	private sns: SES

	private constructor(config: ISesService.Credentials) {
		this.sns = new SES(config)
	}
}
