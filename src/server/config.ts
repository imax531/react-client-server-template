import dotenv from 'dotenv';
import findUp from 'find-up';
import path from 'path';
import fs from 'fs';

export const IS_DEV = process.env.NODE_ENV !== 'production';

if (IS_DEV) {
  dotenv.config({ path: findUp.sync('.env') });
}

const packageJsonPath = path.join(process.cwd(), 'package.json');
const rawPackageJson = fs.readFileSync(packageJsonPath).toString();
const PackageJson = JSON.parse(rawPackageJson);
const { version: VERSION } = PackageJson;

export const MONGO_SETTINGS = {
    url: 'mongodb://mongo:27017',
    database: 'todo'
};
export const POSTGRES_SETTINGS = {
    connectionString: 'postgresql://postgres:mysecretpassword@postgres:5432/todo'
};

// server
export const SERVER_PORT = process.env.PORT || 3000;
export const WEBPACK_PORT = 8085; // For dev environment only

export { VERSION };
