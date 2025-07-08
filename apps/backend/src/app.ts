import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import { identityApp } from '@controllers/identity.controller.js'
import { HTTPException } from 'hono/http-exception'
import { requestId } from 'hono/request-id'
import { bookmarkApp } from '@controllers/bookmark.controller.js'

const api = new Hono().basePath('/api')

// register middlewares
api.use(requestId())
api.use(logger())
api.use(cors())

// register controllers
api.route('/identity', identityApp)
api.route('/bookmark', bookmarkApp)

api.onError((err, c) => {
    if (err instanceof HTTPException) {
        return err.getResponse()
    }
    return c.json({
        status: 500,
        message: 'something went wrong',
    })
})

export { api }
