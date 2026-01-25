"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickRoute = void 0;
const db_1 = require("../utils/db");
const clickRoute = async (req, res) => {
    const { emailId, url } = req.query;
    if (emailId && url) {
        await db_1.db.query(`INSERT INTO email_events(email_id,ip,event_type,user_agent) VALUES ($1,$2,'click',$3)`, [emailId, req.ip, req.headers['user-agent']]);
    }
    return res.redirect(302, url);
};
exports.clickRoute = clickRoute;
