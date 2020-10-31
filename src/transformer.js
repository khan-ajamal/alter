const { trim, split, forEach, isEmpty } = require('lodash');
const sharp = require('sharp');

const s3Image = require('./aws');
const { parseType } = require('./utils');

const TRANSFORMATIONS = {
  w: 'width',
  h: 'height',
  f: 'format',
  q: 'quality',
  b: 'blur',
};

class ImageProcessing {
  /**
   * ImageProcessing is a class which loads image and perform transformation on it using sharp package
   * @param {string} imagePath - Path of image file can be a HTTP path or relative path
   * @param {Object} s3Config - If image needs to be loaded from S3 provide configurations
   */
  constructor(imagePath, s3Config = {}) {
    this.s3Config = s3Config;
    this.path = imagePath;
    this.sharp = sharp({
      failOnError: false,
    });
  }

  getTransformations(mod) {
    const transforms = split(trim(mod), ',');
    const transformations = {};
    forEach(transforms, (transform) => {
      const [property, value] = split(trim(transform), '_');
      transformations[TRANSFORMATIONS[property]] = parseType(value);
    });
    this.transformations = transformations;
  }

  transform(transformations) {
    this.getTransformations(transformations);

    let image = s3Image(this.s3Config).pipe(this.sharp);

    const resize = {};
    const formatOptions = { quality: 85 };
    let format = 'jpeg';

    forEach(this.transformations, (value, index) => {
      switch (index) {
        case 'width':
          resize.width = value;
          break;
        case 'height':
          resize.height = value;
          break;
        case 'format':
          format = value;
          break;
        case 'quality':
          formatOptions.quality = value;
          break;
        case 'blur':
          formatOptions.quality = 1;
          break;
        default:
          break;
      }
    });

    image = image.toFormat(format, formatOptions);
    if (!isEmpty(resize)) {
      image = image.resize(resize);
    }
    return image.toBuffer({ resolveWithObject: true });
  }
}

module.exports = ImageProcessing;
