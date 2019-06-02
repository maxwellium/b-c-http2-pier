"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http2_json_send_1 = require("http2-json-send");
;
function http2Pier(handler, send = 0 /* none */) {
    return async (ctx) => {
        try {
            const output = await handler(ctx);
            switch (send) {
                case 1 /* json */:
                    await http2_json_send_1.http2jsonSend(ctx.res, output);
                    break;
                case 2 /* stream */:
                    output.pipe(ctx.res.stream);
                    break;
            }
        }
        catch (e) {
            await http2_json_send_1.http2jsonSend(ctx.res, e, e.statusCode || 500);
        }
    };
}
exports.http2Pier = http2Pier;
//# sourceMappingURL=index.js.map