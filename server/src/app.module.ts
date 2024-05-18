import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FilesModule } from './files/files.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'root',
			database: 'cloud-storage',
			entities: [],
			synchronize: true,
		}),
		UsersModule,
		FilesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
