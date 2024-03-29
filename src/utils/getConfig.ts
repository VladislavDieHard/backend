import { parseValue } from './index';
import * as dotenv from 'dotenv';
dotenv.config();

export function getConfig() {
  const envKeys = Object.keys(process.env).reduce((arr, key) => {
    if (key.includes('NEST')) {
      arr.push(key.substring(5, key.length));
    }
    return arr;
  }, []);
  const envObject = {};
  envKeys.forEach((key) => {
    envObject[key] = parseValue(process.env[`NEST_${key}`]);
  });

  return envObject;
}
