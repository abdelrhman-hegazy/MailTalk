import { User } from "../entities/user.entity";

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<void>;
  getAllUsers(): Promise<User[]>;
}
