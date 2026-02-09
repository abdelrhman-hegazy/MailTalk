import { HashService } from "../../domain/services/hash.service";
import bcrypt from "bcrypt";
export class BcryptService implements HashService {
  hash(password: string) {
    return bcrypt.hash(password, 10);
  }

  compare(password: string, hash: string) {
    console.log(`password: ${password}, hash: ${hash}`);
    return bcrypt.compare(password, hash);
  }
}
