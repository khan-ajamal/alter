/**
 * parseType - convert value to there respective type
 */
const parseType = (value) => {
  const number = /^\d+$/gi;
  if (typeof value === 'string') {
    if (number.test(value)) {
      return parseInt(value, 10);
    }
  }
  return value;
};

module.exports = {
  parseType,
};
