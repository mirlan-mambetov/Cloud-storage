import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/users/entities/user.entity'
import { UserService } from 'src/users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					secret: configService.get<string>('SECRET'),
					signOptions: { expiresIn: configService.get('EXPIRESIN') },
				}
			},
		}),
		TypeOrmModule.forFeature([UserEntity]),
		PassportModule,
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
