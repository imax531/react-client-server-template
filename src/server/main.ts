import express from 'express';
import path from 'path';
import { pagesRouter } from './routes/pages-router';
import { tasksRouter } from './routes/tasks-router';
import { staticsRouter } from './routes/statics-router';
import * as config from './config';
import { Postgres } from './db/postgres';
import { MongoDB } from './db/mongo';
import { DB } from './db/db';

const mongo = new MongoDB(config.MONGO_SETTINGS.url, config.MONGO_SETTINGS.database);
const postgres = new Postgres(config.POSTGRES_SETTINGS.connectionString);
const db = new DB(mongo, postgres);

const app = express();
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use(tasksRouter(db));
app.use(staticsRouter());
app.use(pagesRouter());

app.listen(config.SERVER_PORT as number, '0.0.0.0', () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`);
});
