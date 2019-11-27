export interface Credentials {
    credentials?: {
        accessKeyId: string;
        secretAccessKey: string;
    };
    region: string;
}
export interface BaseResponse {
    ResponseMetadata: {
        RequestId: string;
    };
}
export interface EmailPayload {
    Destination: {
        ToAddresses: string[];
        CcAddresses?: string[];
        BccAddresses?: string[];
    };
    Message: {
        Body: {
            Html?: {
                Charset: string;
                Data: string;
            };
            Text?: {
                Charset: string;
                Data: string;
            };
        };
        Subject: {
            Charset: string;
            Data: string;
        };
    };
    Source: string;
    ReplyToAddresses?: string[];
}
export interface EmailPayloadTemplate extends EmailPayload {
    Template: string;
    TemplateData: string;
    ReturnPath?: string;
    ReturnPathArn?: string;
    ConfigurationSetName?: string;
    SourceArn?: string;
    Tags?: [{
        Name: string;
        Value: string;
    }];
    TemplateArn?: string;
}
export interface EmailRes extends BaseResponse {
    MessageId: string;
}
