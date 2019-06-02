import { Context, Handler } from 'http2-router';
import { http2jsonSend } from 'http2-json-send';
import { Readable } from 'stream';

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

export const enum http2PierSend {
  none,
  json,
  stream
};


export function http2Pier(
  handler: Handler,
  send: http2PierSend = http2PierSend.none
): http2Pier {
  return async ( ctx: Context ) => {
    try {
      const output = await handler( ctx );
      switch ( send ) {
        case http2PierSend.json:
          await http2jsonSend( ctx.res, output );
          break;
        case http2PierSend.stream:
          ( output as Readable ).pipe( ctx.res.stream );
          break;
      }
    } catch ( e ) {
      await http2jsonSend( ctx.res, e, e.statusCode || 500 );
    }
  };
}
