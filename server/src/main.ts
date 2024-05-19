import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as express from 'express'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()

	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))
	const config = new DocumentBuilder()
		.setTitle('Cloud Storage API DOCUMENTATION')
		.setDescription('API documentation for Cloud Storage server')
		.setVersion('1.0')
		.addTag('API ROUTES')
		.addBearerAuth()
		.setLicense('MIT', 'https://github.com/mirlan-mambetov/cloud-storage')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api-docs', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	})

	await app.listen(5000)
	console.log(`SERVER RUNNING ON ${await app.getUrl()}`)
}
bootstrap()
