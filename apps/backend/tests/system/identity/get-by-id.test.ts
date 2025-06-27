import { describe, test } from "node:test";
import assert from 'node:assert'

import app from '../../../src/app.js'

describe('GET /identity/:id', () => {
    
    test('get user by id 1', async () => {
        const res = await app.request('/identity/1', {
            method: 'GET',
        })
        assert.equal(res.status, 200)
    })
    
    
    test('invalid id', async () => {
        const res = await app.request('/identity/invalid')
        assert.equal(res.status, 400)
    })
    
})
