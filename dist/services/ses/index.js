"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_REJECTED = void 0;
const aws_sdk_1 = require("aws-sdk");
const await_to_js_1 = require("await-to-js");
const CHARSET_UTF_8 = 'UTF-8';
const SES_REGION = 'us-west-2';
exports.MESSAGE_REJECTED = 'MessageRejected';
class SESService {
    constructor(config) {
        this.sns = new aws_sdk_1.SES(config);
    }
    static sharedInstance() {
        if (!this._sharedInstance) {
            const credentials = {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            };
            this._sharedInstance = new this({
                credentials: credentials.accessKeyId ? credentials : undefined,
                region: SES_REGION
            });
        }
        return this._sharedInstance.sns;
    }
}
exports.default = SESService;
SESService.sendEmail = (source, recipients, ccAddresses, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = '[sendEmail] -';
    if (source === '' || !recipients.length || subject === '' || body === '') {
        const errMsg = 'failed to send email because of missing params';
        throw new Error(errMsg);
    }
    const emailParams = SESService.createEmailParams(source, recipients, ccAddresses, subject, body);
    const sendEmailPromise = SESService.sharedInstance().sendEmail(emailParams).promise();
    const [emailErr, res] = yield await_to_js_1.default(sendEmailPromise);
    if (emailErr) {
        throw emailErr;
    }
    return res;
});
SESService.sendHTMLEmail = (source, recipients, ccAddresses, bccAddresses, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = '[sendEmail] -';
    if (source === '' || !recipients.length || subject === '' || html === '') {
        const errMsg = 'failed to send email because of missing params';
        throw new Error(errMsg);
    }
    const emailParams = SESService.createHTMLEmailParams(source, recipients, ccAddresses, bccAddresses, subject, html);
    const sendEmailPromise = SESService.sharedInstance().sendEmail(emailParams).promise();
    const [emailErr, res] = yield await_to_js_1.default(sendEmailPromise);
    if (emailErr) {
        throw emailErr;
    }
    return res;
});
SESService.createEmailParams = (source, recipients, ccAddresses, subject, html) => {
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
    };
};
SESService.createHTMLEmailParams = (source, recipients, ccAddresses, bccAddresses, subject, body) => {
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
    };
};
