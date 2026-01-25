"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const open_1 = require("./src/routes/open");
const click_1 = require("./src/routes/click");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({ windowMs: 60000, max: 20 }));
app.get('/open', open_1.openRoute);
app.get('/click', click_1.clickRoute);
app.get('/', (req, res) => {
    res.send('server is working fine');
});
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
});
