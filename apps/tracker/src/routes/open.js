"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openRoute = void 0;
const email_service_1 = require("../services/email.service");
const pixel_1 = require("../utils/pixel");
const openRoute = async (req, res) => {
    const emailId = req.query.emailId;
    if (emailId) {
        await (0, email_service_1.logOpen)({
            emailId,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        });
    }
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-store');
    res.send(pixel_1.pixelBuffer);
};
exports.openRoute = openRoute;
