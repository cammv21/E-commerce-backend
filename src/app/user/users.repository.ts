import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

export const USER_REPOSITORY = "UserRepository";

export interface UserRepository {
    createUser(user: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
}