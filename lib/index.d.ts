export declare const generatePolicy: ({ key, bucket, contentType, region, accessKey, secretKey, acl, successActionStatus, exp, conditions, now, }: {
    key: string;
    bucket: string;
    contentType: string;
    region: string;
    accessKey: string;
    secretKey: string;
    acl?: string | undefined;
    successActionStatus?: string | undefined;
    exp?: number | undefined;
    conditions?: any[] | undefined;
    now?: number | undefined;
}) => {
    key: string;
    acl: string;
    success_action_status: string;
    'Content-Type': string;
    'X-Amz-Credential': string;
    'X-Amz-Algorithm': string;
    'X-Amz-Date': string;
    Policy: string;
    'X-Amz-Signature': string;
};
