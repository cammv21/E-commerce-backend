import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserDocument, UserModel } from "./schemas/user.schema";
import { UserRepository } from "./users.repository";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserMongoRepository implements UserRepository{
    constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users.map((user) => this.mapToUser(user));
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel
            .findById(id)
            .exec();
        if (!user) {
            return null;
        }
        return this.mapToUser(user);
    }
    
    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel
        .findOne({ email })
        .exec();
        if (!user) {
            return null;
        }
        return this.mapToUser(user);
    }
    
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const userCreated = await new this.userModel(createUserDto).save();
        return this.mapToUser(userCreated);
    }

    private mapToUser(rawUser: UserDocument): User {
        const user = new User();
    
        user.id = rawUser.id;
        user.email = rawUser.email;
        user.name = rawUser.name;
        user.password = rawUser.password;
        user.roleId = rawUser.roleId.toString();
        user.createdAt = rawUser.createdAt;
        user.updatedAt = rawUser.updatedAt;
    
        return user;
    }

}