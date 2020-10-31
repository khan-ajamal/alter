const { S3 } = require('aws-sdk');

module.exports = (params) => {
  return new S3().getObject(params).createReadStream();
};
