import { Hono } from 'hono'
import { register } from '@services/identity/register.identity.js'
import { login } from '@services/identity/login.identity.js'
import { getUserById } from '@services/identity/get-by-id.identity.js'
import { verifyEmail } from '@services/identity/verify-email.identity.js'
import { zValidator } from '@hono/zod-validator'
import {
    GetByIdRequestSchema,
    LoginRequestSchema,
    RegisterRequestSchema,
    VerifyEmailRequestSchema,
} from '@zakra/api-spec'
import { HTTPException } from 'hono/http-exception'

const identityApp = new Hono()

identityApp.post(
    '/register',
    zValidator('json', RegisterRequestSchema),
    async (c, _) => {
        try {
            const body = c.req.valid('json')
            await register(body)
            return c.json({ success: true })
        } catch (err) {
            throw new HTTPException(400, { cause: err })
        }
    }
)

identityApp.get(
    '/verify/:token',
    zValidator('param', VerifyEmailRequestSchema),
    async (c, _) => {
        try {
            const { token } = c.req.valid('param')
            const isValid = await verifyEmail(token)
            if (isValid) {
                return c.json({ success: true })
            }
            return c.status(400)
        } catch (err) {
            throw new HTTPException(400, { cause: err })
        }
    }
)

identityApp.post(
    '/login',
    zValidator('json', LoginRequestSchema),
    async (c, _) => {
        try {
            const body = c.req.valid('json')
            const result = await login(body)
            return c.json({
                success: true,
                token: result.token,
            })
        } catch (err) {
            throw new HTTPException(400, {
                message: 'something went wrong',
                cause: err,
            })
        }
    }
)

identityApp.get(
    '/:id',
    zValidator('param', GetByIdRequestSchema),
    async (c, _) => {
        try {
            const { id } = c.req.valid('param')
            const user = await getUserById(id)
            return c.json({
                success: true,
                data: user,
            })
        } catch (err) {
            throw new HTTPException(400, { cause: err })
        }
    }
)

identityApp.patch('/:id', (c) => {
    const id = c.req.param('id')
    return c.json({ success: true, id: id })
})

export { identityApp }
