import 'express';
import { CurrentUser } from './current-user/current-user.interface';

declare module 'express' {
  export interface Request {
    user: CurrentUser;
  }
}
