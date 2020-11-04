const express = require('express');
const cors = require('cors');

const config = require('./config');
const ImageProcessing = require('./transformer');

const app = express();
app.use(cors());

app.get('/*', (req, res, next) => {
  const period = 60 * 60 * 24 * 365;
  res.setHeader('Last-Modified', new Date().toUTCString());
  res.setHeader('Cache-control', `public, max-age=${period}`);
  next();
});

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
