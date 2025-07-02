import { drizzle } from 'drizzle-orm/node-postgres'
import { config } from '@config'

export const db = drizzle({
    connection: {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.name,
        ssl: true,
    },
})
