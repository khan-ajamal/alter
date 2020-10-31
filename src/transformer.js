const { trim, split, forEach } = require('lodash');
const sharp = require('sharp');

class ImageProcessing {
  /**
   * ImageProcessing is a class which loads image and perform transformation on it using sharp package
   * @param {string} imagePath - Path of image file can be a HTTP path or relative path
   * @param {Object} s3Config - If image needs to be loaded from S3 provide configurations
   */
  constructor(imagePath, s3Config = {}) {
    this.s3Config = s3Config;
    this.path = imagePath;
    this.transformations = this.getTransformations();
  }

  getTransformations() {
    const transforms = split(trim(this.transformString), ',');
    const transformations = {};
    forEach(transforms, (transform) => {
      const [property, value] = split(trim(transform), '_');
      transformations[property] = value;
    });
    return transformations;
  }

  loadImage() {
    // is it a http url or s3 or local file
    console.log(this.path, this.s3Config);
    return sharp();
  }
}

module.exports = ImageProcessing;
