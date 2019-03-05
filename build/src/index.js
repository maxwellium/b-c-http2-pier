"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http2_json_send_1 = require("http2-json-send");
var http2PierSend;
(function (http2PierSend) {
    http2PierSend[http2PierSend["none"] = 0] = "none";
    http2PierSend[http2PierSend["json"] = 1] = "json";
    http2PierSend[http2PierSend["stream"] = 2] = "stream";
})(http2PierSend = exports.http2PierSend || (exports.http2PierSend = {}));
;
function http2Pier(handler, send = http2PierSend.none) {
    return (ctx) => __awaiter(this, void 0, void 0, function* () {
        try {
            const output = yield handler(ctx);
            switch (send) {
                case http2PierSend.json:
                    yield http2_json_send_1.http2jsonSend(ctx.res, output);
                    break;
                case http2PierSend.stream:
                    output.pipe(ctx.res.stream);
                    break;
            }
        }
        catch (e) {
            yield http2_json_send_1.http2jsonSend(ctx.res, e, e.statusCode || 500);
        }
    });
}
exports.http2Pier = http2Pier;
//# sourceMappingURL=index.js.map