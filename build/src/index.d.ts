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
export declare function http2Pier(handler: Handler): http2Pier;
