import { generatePolicy } from './index';

test('generatePolicy', () => {
  expect(
    generatePolicy({
      key: 'filename.jpg',
      bucket: 'my-bucket',
      contentType: 'image/jpeg',
      region: 'us-west-1',
      accessKey: 'ACCESS_KEY',
      secretKey: 'SECRET_KEY',
      now: 1538623106445,
    })
  ).toEqual({
    'Content-Type': 'image/jpeg',
    Policy:
      'eyJleHBpcmF0aW9uIjoiMjAxOC0xMC0wNFQwMzoyMzoyNi40NDVaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoibXktYnVja2V0In0seyJrZXkiOiJmaWxlbmFtZS5qcGcifSx7ImFjbCI6InB1YmxpYy1yZWFkIn0seyJzdWNjZXNzX2FjdGlvbl9zdGF0dXMiOiIyMDEifSx7IkNvbnRlbnQtVHlwZSI6ImltYWdlL2pwZWcifSx7IngtYW16LWNyZWRlbnRpYWwiOiJBQ0NFU1NfS0VZLzIwMTgxMDA0L3VzLXdlc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IngtYW16LWRhdGUiOiIyMDE4MTAwNFQwMDAwMDBaIn1dfQ==',
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': 'ACCESS_KEY/20181004/us-west-1/s3/aws4_request',
    'X-Amz-Date': '20181004T000000Z',
    'X-Amz-Signature':
      '6e2243bf386bb4f41821a4b8f5c77f271ea3c834bf7982f84c242379cfa764b2',
    acl: 'public-read',
    key: 'filename.jpg',
    success_action_status: '201',
  });
});
