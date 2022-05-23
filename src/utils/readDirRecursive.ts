import { lstat, readdir } from 'node:fs/promises';
import * as path from 'path';

export async function readDirRecursive(dir) {
  let results = [];
  const entries = await readdir(dir);

  for (const entry of entries) {
    const entryPath = path.join(dir, entry);
    const entryStat = await lstat(entryPath);

    if (entryStat.isDirectory()) {
      const newEntries = await readDirRecursive(entryPath);
      results = results.concat(newEntries);
    } else {
      results.push(entryPath);
    }
  }

  return results;
}

// TODO на посмотреть
// function uploadDirRecursive(dir, done) {
//   let results = [];
//   fs.readdir(dir, function (err, list) {
//     if (err) return done(err);
//     let i = 0;
//     (function next() {
//       let file = list[i++];
//       if (!file) return done(null, results);
//       file = path.resolve(dir, file);
//
//       fs.stat(file, (err, stat) => {
//         if (stat && stat.isDirectory()) {
//           uploadDirRecursive(file, function (err, res) {
//             results = results.concat(res);
//             next();
//           });
//         } else {
//           results.push(file);
//           next();
//         }
//       });
//     })();
//   });
// }
