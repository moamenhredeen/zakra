import { seed } from "drizzle-seed";
import { db } from "./data-source.js";
import { users } from "./schema.js";
import { hashPassword } from "@infrastructure/security/password-hashing.service.js";

const passwordHash = await hashPassword('12341234')
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
