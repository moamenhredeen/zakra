import { seed } from "drizzle-seed";
import { db } from "./data-source.js";
import { users } from "./schema.js";
import bcrypt from 'bcrypt'

const passwordHash = await bcrypt.hash('12341234', 8)
await seed(db, {
    users,
}).refine((f) => ({
    users: {
        columns: {
            passowrd_hash: f.valuesFromArray({values: [passwordHash]}),
            deleted_at: f.valuesFromArray({values: [undefined]}),
        },
        count: 100
    }
}))
