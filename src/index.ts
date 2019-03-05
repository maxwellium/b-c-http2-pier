import { Context, Handler } from 'http2-router';
import { http2jsonSend } from 'http2-json-send';

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

export function http2Pier( handler: Handler ): http2Pier {
  return async ( ctx: Context ) => {
    try {
      await handler( ctx );
    } catch ( e ) {
      await http2jsonSend( ctx.res, e, e.statusCode || 500 );
    }
  };
}