import mysql from 'mysql';
import { getConfig } from '../utils/getConfig';

const config = getConfig();

export const db = mysql.createConnection({
  host: config['OLD_DB'],
  port: config['OLD_DB_PORT'],
  user: config['OLD_DB_USER'],
  password: config['OLD_DB_PASS'],
  database: config['OLD_DB_NAME'],
});

// db.connect();

export const database = db;
