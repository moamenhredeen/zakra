import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import UserController from './controllers/identity.controller.js'
import { HTTPException } from 'hono/http-exception'
import { requestId } from 'hono/request-id'

const app = new Hono()

// register middlewares
app.use(requestId())
app.use(logger())
app.use(cors())

// register controllers
app.route('/identity', UserController)

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return err.getResponse()
    } else {
        return c.json({
            status: 500,
            message: 'something went wrong'
        })
    }
})

export default app;
