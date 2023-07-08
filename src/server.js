import express, { json, urlencoded } from 'express';
import compression from 'compression';
import cors from 'cors';
import routes from './routes/index.js';
import { config } from 'dotenv';
// .env
config();
const app = express();
const PORT = process.env.PORT || 8080;
// middleware
app.use(compression());
app.use(json({ limit: '1mb' }));
app.use(urlencoded({ limit: '1mb', extended: true }));
app.use(cors());
// router
app.use('/api', routes);
// not found
app.use((_req, res) => {
  res.status(404).send({ error: 'Страница не обнаружена!' });
});

// started
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
