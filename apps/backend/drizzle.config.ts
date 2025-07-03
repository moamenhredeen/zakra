import { defineConfig } from 'drizzle-kit'
import { config } from './src/config.js'

// oxlint-disable-next-line no-default-export
export default defineConfig({
    out: './src/infrastructure/databaes/generated',
    schema: './src/infrastructure/database/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.name,
    },
})
