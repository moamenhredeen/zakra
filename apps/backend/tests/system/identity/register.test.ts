import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { api } from '../../../src/app.js'

describe('POST /identity/register', () => {
    test('register', async () => {
        const res = await api.request('/identity/register', {
            method: 'POST',
            body: JSON.stringify({
                firstName: 'moamen',
                lastName: 'hredeen',
                email: 'moamen@hredeen.com',
                username: 'moamenhredeen',
                password: '12341234'
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        assert.equal(res.status, 200)
    })
    
  
})
