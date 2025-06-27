import { Hono } from "hono";
import { register, getUserById, login } from "../services/identity/index.js";
import { zValidator } from "@hono/zod-validator";
import {
    RegisterRequestSchema,
    LoginRequestSchema,
    GetByIdRequestSchema,
} from "@zakra/api-spec";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.post("/register", zValidator("json", RegisterRequestSchema), async (c, next) => {
    try {
        const body = c.req.valid("json");
        await register(body);
        return c.json({ success: true });
    } catch (err) {
        throw new HTTPException(400, {cause: err})
    }
});

app.post("/login", zValidator("json", LoginRequestSchema), async (c, next) => {
    try {
        const body = c.req.valid("json");
        const result = await login(body);
        return c.json({
            success: true,
            token: result.token,
        });
    } catch (err) {
        throw new HTTPException(400, { message: 'something went wrong', cause: err });
    }
});

app.get("/:id", 
    zValidator("param", GetByIdRequestSchema), 
    async (c, next) => {
    try{
        const {id} = c.req.valid('param');
        const user = await getUserById(id);
        return c.json({
            success: true,
            data: user,
        });
    }catch (err) {
        throw new HTTPException(400, {cause: err})
    }
});

app.patch("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ success: true });
});

export default app;
