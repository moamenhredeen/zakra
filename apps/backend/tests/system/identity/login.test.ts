import { describe, test } from "node:test";
import assert from "node:assert";

import app from "../../../src/app.js";

describe("POST /identity/login", () => {
    test("login with valid user credentials", async () => {
        const res = await app.request("/identity/login", {
            method: "POST",
            body: JSON.stringify({
                username: "Hera",
                password: "12341234",
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
        assert.equal(res.status, 200);
    });

    test("login with invalid user credentials", async () => {
        const res = await app.request("/identity/login", {
            method: "POST",
            body: JSON.stringify({
                username: "Heraxx",
                password: "12341234",
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
        assert.equal(res.status, 400);
    });
    
    test("login with invalid payload", async () => {
          const res = await app.request("/identity/login", {
              method: "POST",
              body: JSON.stringify({
                  name: "Heraxx",
                  password: "12341234",
              }),
              headers: new Headers({
                  "Content-Type": "application/json",
              }),
          });
          assert.equal(res.status, 400);
      });
});
