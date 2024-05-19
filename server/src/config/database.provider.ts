import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { FileEntity } from 'src/files/entities/file.entity'
import { UserEntity } from 'src/users/entities/user.entity'

export const databaseProvider = (
	configService: ConfigService,
): TypeOrmModuleOptions => ({
	type: 'postgres',
	host: configService.get<string>('DB_HOST'),
	port: configService.get<number>('DB_PORT'),
	username: configService.get<string>('DB_USER'),
	password: configService.get<string>('DB_PASSWORD'),
	database: configService.get<string>('DB_NAME'),
	entities: [FileEntity, UserEntity],
	autoLoadEntities: true,
	synchronize: true,
})
