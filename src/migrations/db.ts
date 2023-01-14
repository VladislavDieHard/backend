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

export const normalize_db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'example',
  database: 'db_noub_old',
});

export const new_db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'example',
  database: 'db_noub',
});

normalize_db.connect();
new_db.connect();

export const database = db;
