import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()

	const config = new DocumentBuilder()
		.setTitle('Cloud Storage API DOCUMENTATION')
		.setDescription('API documentation for Cloud Storage server')
		.setVersion('1.0')
		.addTag('API ROUTES')
		.setLicense('MIT', 'https://github.com/mirlan-mambetov/cloud-storage')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api-docs', app, document)

	await app.listen(5000)
	console.log(`SERVER RUNNING ON ${await app.getUrl()}`)
}
bootstrap()
