import { serve } from '@hono/node-server'
import { config } from './config.js'
import app from './app.js'

serve({
  fetch: app.fetch,
  port: config.server.http.port 
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

export default app;
