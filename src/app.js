const express = require('express');

const config = require('./config');
const ImageProcessing = require('./transformer');

const app = express();

app.get('/:transformations/:path([\\w\\./]+)', (req, res) => {
  const image = new ImageProcessing(req.params.path, {
    Bucket: config.aws.bucket,
    Key: req.params.path,
  });
  image
    .transform(req.params.transformations)
    .then(({ data, info }) => {
      res.type(info.format).send(data);
    })
    .catch((err) => console.log(err));
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
