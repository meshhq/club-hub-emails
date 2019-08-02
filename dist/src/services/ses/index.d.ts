import { SES } from 'aws-sdk';
import * as ISesService from './types';
export declare const MESSAGE_REJECTED = "MessageRejected";
export default class SESService {
    static sharedInstance(): SES;
    static sendEmail: (source: string, recipients: string[], ccAddresses: string[], subject: string, body: string) => Promise<ISesService.EmailRes>;
    static sendHTMLEmail: (source: string, recipients: string[], ccAddresses: string[], bccAddresses: string[], subject: string, html: string) => Promise<ISesService.EmailRes>;
    private static _sharedInstance;
    private static createEmailParams;
    private static createHTMLEmailParams;
    private sns;
    private constructor();
}
