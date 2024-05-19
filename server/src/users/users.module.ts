import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UserService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UserService],
	imports: [TypeOrmModule.forFeature([UserEntity])],
	exports: [UserService],
})
export class UsersModule {}
