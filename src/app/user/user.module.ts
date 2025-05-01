import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserSchema } from './schemas/user.schema';
import { UserMongoRepository } from './user-mongo.repository';
import { USER_REPOSITORY } from './users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: User.name, schema: UserSchema}
    ])
],
  controllers: [UsersController],
  providers: [
    UserService, 
    {
      provide: USER_REPOSITORY,
      useClass: UserMongoRepository,
    }
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}
