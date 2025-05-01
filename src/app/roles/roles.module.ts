import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';
import { RoleSchema } from './schemas/role.schema';
import { ROLE_REPOSITORY } from './roles.repository';
import { RoleMongoRepository } from './role-mongo.repository';


@Module({
  imports: [
    MongooseModule.forFeature([ 
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [
      RolesService, 
      {
        provide: ROLE_REPOSITORY,
        useClass: RoleMongoRepository,
      }
    ],
  controllers: [RolesController],
})
export class RolesModule {}
