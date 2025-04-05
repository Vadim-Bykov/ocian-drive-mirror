import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
