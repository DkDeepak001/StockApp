import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({
  path: "../../../.env"
});

export default {
  schema: "./src/schema",
  out: './src/migration',
  driver: "pg",
  dbCredentials: { connectionString: process.env.DB_URL! },
  schemaFilter: "schemaOne",
} satisfies Config;

