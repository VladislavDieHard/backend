import { database } from './db';

export async function select(sql: string): Promise<any[]> {
  return new Promise((res, rej) => {
    database.query(sql, (error, results) => {
      if (error) {
        rej(error);
      } else {
        res(results);
      }
    });
  });
}

export async function count(table: string): Promise<number> {
  return new Promise((res, rej) => {
    database.query(`SELECT COUNT(*)  FROM ${table}`, (error, results) => {
      if (error) {
        rej(error);
      } else {
        res(results[0]['COUNT(*)']);
      }
    });
  });
}
