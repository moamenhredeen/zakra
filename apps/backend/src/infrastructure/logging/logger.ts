import { pino } from 'pino'

const loggerInstance = pino({
    level: 'debug',
})

// ----------------------- public api -----------------------

export function logError(message: unknown): void {
    loggerInstance.error(message)
}

export function logInformation(message: string): void {
    loggerInstance.info(message)
}

export function logDebug(message: string): void {
    loggerInstance.debug(message)
}

export function logTrace(message: string): void {
    loggerInstance.trace(message)
}
