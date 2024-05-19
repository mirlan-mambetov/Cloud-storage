import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/users/entities/user.entity'
import { UserService } from 'src/users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService, LocalStrategy],
	imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule],
})
export class AuthModule {}
