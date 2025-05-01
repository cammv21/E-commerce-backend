import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

export const USER_REPOSITORY = "UserRepository";

export interface UserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    createUser(user: CreateUserDto): Promise<User>;
}