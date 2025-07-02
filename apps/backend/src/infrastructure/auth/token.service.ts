import { config } from '@config'
import { logError } from '@infrastructure/logging/logger.js'
import jwt from 'jsonwebtoken'

// ----------------------- types -----------------------
export type TokenPayload = {
    userId: string
}

export type VerifyTokenResult = {
    isValid: boolean
    payload?: TokenPayload
}

// ----------------------- public api -----------------------
export function generateToken(payload: TokenPayload): string {
    return jwt.sign({ sub: payload.userId }, config.jwt.secret, {
        expiresIn: '1h',
    })
}

export function verifyToken(token: string): VerifyTokenResult {
    try {
        const payload = jwt.verify(token, config.jwt.secret, {})
        return {
            isValid: true,
            payload: {
                userId: payload.sub as string,
            },
        }
    } catch (err) {
        logError(err)
        return {
            isValid: false,
        }
    }
}
