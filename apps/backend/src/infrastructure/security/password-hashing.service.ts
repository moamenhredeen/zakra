import bcrypt from 'bcrypt'

// ----------------------- constants -----------------------
const ROUNDS = 10

// ----------------------- public api -----------------------
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, ROUNDS)
}

export async function verifyPassword(
    password: string,
    hash: string
): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}
