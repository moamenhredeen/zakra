import { serve } from '@hono/node-server'
import { config } from '@config'
import { api } from './app.js'
import { logInformation } from '@infrastructure/logging/logger.js'

serve(
    {
        fetch: api.fetch,
        port: config.server.http.port,
    },
    (info) => {
        logInformation(`Server is running on http://localhost:${info.port}`)
    }
)
