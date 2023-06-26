import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
// .env
config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const clinic = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST || "clinic-db",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "clinic",
    charset: "utf8",
    timezone: "Europe/Moscow",
  },
  pool: { min: 0, max: 50 },
  acquireConnectionTimeout: 10000,
  migrations: {
    directory: `${__dirname}/src/database/migrations`,
    loadExtensions: [".cjs"],
    tableName: "migrations",
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`,
    loadExtensions: [".cjs"],
  },
};
