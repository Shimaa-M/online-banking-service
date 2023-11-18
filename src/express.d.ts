// express.d.ts

import { Session } from 'express-session';

declare module 'express-serve-static-core' {
  interface Request {
    session: Session & { [key: string]: any }; // Adjust the type accordingly
  }
}
