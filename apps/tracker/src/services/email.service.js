"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOpen = void 0;
const db_1 = require("../utils/db");
const logOpen = async (data) => {
    await db_1.db.query(`INSERT INTO email_events(email_id,ip,event_type,user_agent) VALUES ($1,$2,'open',$3)`, [data.emailId, data.ip, data.userAgent]);
    await db_1.db.query(`UPDATE emails
     SET opened_at = COALESCE(opened_at, now()),
         open_count = open_count + 1
     WHERE id=$1`, [data.emailId]);
};
exports.logOpen = logOpen;
