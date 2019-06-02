import { Handler } from 'http2-router';
export interface http2Pier extends Handler {
    /** input */
    i?: any;
    /** output */
    o?: any;
    /** name */
    n?: string;
    /** description */
    d?: string;
}
export declare const enum http2PierSend {
    none = 0,
    json = 1,
    stream = 2
}
export declare function http2Pier(handler: Handler, send?: http2PierSend): http2Pier;
