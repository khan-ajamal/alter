import { Router } from 'express';

export default () => {
  const app = Router();
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  return app;
};
