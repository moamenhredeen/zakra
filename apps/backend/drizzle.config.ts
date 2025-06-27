import { defineConfig } from 'drizzle-kit';
import { config } from './src/config.js';

export default defineConfig({
  out: './src/databaes/generated',
  schema: './src/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name
  },
});
