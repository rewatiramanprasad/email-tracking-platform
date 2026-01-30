"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
exports.db = global.pgPool ??
    new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });
if (process.env.NODE_ENV !== 'production') {
    global.pgPool = exports.db;
}
