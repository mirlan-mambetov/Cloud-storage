import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const databaseProvider = (
	configService: ConfigService,
): TypeOrmModuleOptions => ({
	type: 'postgres',
	host: configService.get<string>('DB_HOST'),
	port: configService.get<number>('DB_PORT'),
	username: configService.get<string>('DB_USER'),
	password: configService.get<string>('DB_PASSWORD'),
	database: configService.get<string>('DB_NAME'),
	entities: [],
	autoLoadEntities: true,
	synchronize: true,
})
