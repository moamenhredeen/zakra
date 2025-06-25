import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import UserController from './controllers/user.controller.js'

const app = new Hono()

// register middlewares
app.use(logger())
app.use(cors())

// register controllers
app.route('user', UserController)

// start the server
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
