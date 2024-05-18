import {
	Body,
	Controller,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { CreateFileDto } from './dto/create-file.dto'
import { FilesService } from './files.service'
import { fileStorage } from './storage'

@Controller('files')
@ApiTags('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('file', {
			storage: fileStorage,
		}),
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	create(
		@Body() createFileDto: CreateFileDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
			}),
		)
		file: Express.Multer.File,
	) {
		return file
	}
}
