import * as bcrypt from 'bcrypt';

export class Hash {
  private static salt = bcrypt.genSaltSync();

  static validate(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  static createHash(password: string) {
    return bcrypt.hash(password, Hash.salt);
  }
}
