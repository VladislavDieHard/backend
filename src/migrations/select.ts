export async function select(db: any, sql: string): Promise<any[]> {
  return new Promise((res, rej) => {
    db.query(sql, (error, results) => {
      if (error) {
        rej(error);
      } else {
        res(results);
      }
    });
  });
}

export async function insert(db: any, sql: string): Promise<any[]> {
  return new Promise((res, rej) => {
    db.query(sql, (error, results) => {
      if (error) {
        rej(error);
      } else {
        res(results);
      }
    });
  });
}

export async function count(db: any, table: string): Promise<number> {
  return new Promise((res, rej) => {
    db.query(`SELECT COUNT(*)  FROM ${table}`, (error, results) => {
      if (error) {
        rej(error);
      } else {
        res(results[0]['COUNT(*)']);
      }
    });
  });
}
