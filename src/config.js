const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  aws: {
    region: process.env.AWS_REGION || '',
    bucket: process.env.AWS_BUCKET || '',
  },
};
