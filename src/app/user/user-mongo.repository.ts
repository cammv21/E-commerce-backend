import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserDocument, UserModel } from "./schemas/user.schema";
import { UserRepository } from "./users.repository";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserMongoRepository implements UserRepository{
    constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const userCreated = await new this.userModel(createUserDto).save();
        console.log("createUserDto", createUserDto);
        return this.mapToUser(userCreated);
    }

    private mapToUser(rawUser: UserDocument): User {
        const user = new User();
    
        user.id = rawUser.id;
        user.email = rawUser.email;
        user.name = rawUser.name;
        user.createdAt = rawUser.createdAt;
        user.updatedAt = rawUser.updatedAt;
    
        return user;
    }

}