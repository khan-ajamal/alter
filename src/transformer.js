const { trim, split, forEach } = require('lodash');
const sharp = require('sharp');

const s3Image = require('./aws');

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
      transformations[property] = parseInt(value, 10);
    });
    this.transformations = transformations;
  }

  transform(transformations) {
    this.getTransformations(transformations);
    return s3Image(this.s3Config)
      .pipe(this.sharp)
      .resize({ width: this.transformations.w })
      .toBuffer({ resolveWithObject: true });
  }
}

module.exports = ImageProcessing;
