"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const crypto_1 = require("crypto");
const FIVE_MINUTES = 5 * 60;
const AWS_ACL = 'public-read';
const AWS_SERVICE_NAME = 's3';
const AWS_REQUEST_POLICY_VERSION = 'aws4_request';
const AWS_ALGORITHM = 'AWS4-HMAC-SHA256';
const DEFAULT_SUCCESS_ACTION_STATUS = '201';
const getSignature = (secretKey, yymmdd, region, encodedPolicy) => {
    const kDate = crypto_1.createHmac('sha256', `AWS4${secretKey}`).update(yymmdd);
    const kRegion = crypto_1.createHmac('sha256', kDate.digest()).update(region);
    const kService = crypto_1.createHmac('sha256', kRegion.digest()).update(AWS_SERVICE_NAME);
    const kSigning = crypto_1.createHmac('sha256', kService.digest()).update(AWS_REQUEST_POLICY_VERSION);
    const kSignature = crypto_1.createHmac('sha256', kSigning.digest()).update(encodedPolicy);
    return kSignature.digest('hex');
};
exports.generatePolicy = ({ key, bucket, contentType, region, accessKey, secretKey, acl = AWS_ACL, successActionStatus = DEFAULT_SUCCESS_ACTION_STATUS, exp = FIVE_MINUTES, conditions, now = Date.now(), }) => {
    const date = new Date(now);
    const yymmdd = date
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '');
    const amzDate = `${yymmdd}T000000Z`;
    const expiration = new Date(now + exp * 1000).toISOString();
    const credential = `${accessKey}/${yymmdd}/${region}/${AWS_SERVICE_NAME}/${AWS_REQUEST_POLICY_VERSION}`;
    const algorithm = AWS_ALGORITHM;
    const policy = {
        expiration,
        conditions: [
            { bucket },
            { key },
            { acl },
            { success_action_status: successActionStatus },
            { 'Content-Type': contentType },
            { 'x-amz-credential': credential },
            { 'x-amz-algorithm': algorithm },
            { 'x-amz-date': amzDate },
            ...(conditions || []),
        ],
    };
    const encodedPolicy = buffer_1.Buffer.from(JSON.stringify(policy)).toString('base64');
    const signature = getSignature(secretKey, yymmdd, region, encodedPolicy);
    return {
        key,
        acl,
        success_action_status: successActionStatus,
        'Content-Type': contentType,
        'X-Amz-Credential': credential,
        'X-Amz-Algorithm': algorithm,
        'X-Amz-Date': amzDate,
        Policy: encodedPolicy,
        'X-Amz-Signature': signature,
    };
};
//# sourceMappingURL=index.js.map