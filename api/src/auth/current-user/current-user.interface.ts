import { User } from '@prisma/client';

export interface CurrentUser extends Omit<User, 'password_hash' | 'id'> {
  user_id: string;
}
