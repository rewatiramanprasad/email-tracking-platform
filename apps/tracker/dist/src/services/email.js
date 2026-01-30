"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEmailHtml = void 0;
const buildEmailHtml = (emailId) => `
  <h2>Hello</h2>

  <a href="${process.env.TRACKER_URL}/click?emailId=${emailId}&url=https://example.com">
    Visit Website
  </a>

  <img src="${process.env.TRACKER_URL}/open?emailId=${emailId}"
       width="1" height="1" style="display:none" />
`;
exports.buildEmailHtml = buildEmailHtml;
