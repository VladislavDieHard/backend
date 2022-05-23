export default {
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Principal: {
        AWS: ['*'],
      },
      Action: [
        's3:GetBucketLocation',
        's3:ListBucket',
        's3:ListBucketMultipartUploads',
      ],
      Resource: ['arn:aws:s3:::site'],
    },
    {
      Effect: 'Allow',
      Principal: {
        AWS: ['*'],
      },
      Action: ['s3:GetObject'],
      Resource: ['arn:aws:s3:::site/*'],
    },
  ],
};
