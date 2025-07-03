import { config } from '@config'
import { logError } from '@infrastructure/logging/logger.js'
import jwt from 'jsonwebtoken'

// ----------------------- types -----------------------
export type TokenPayload = {
    userId: number
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
        if (typeof payload.sub !== 'string') {
            return { isValid: false }
        }
        if (Number.isNaN(payload.sub)) {
            return { isValid: false }
        }
        return {
            isValid: true,
            payload: {
                userId: Number.parseInt(payload.sub),
            },
        }
    } catch (err) {
        logError(err)
        return {
            isValid: false,
        }
    }
}
