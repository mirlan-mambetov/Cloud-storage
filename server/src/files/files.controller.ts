import {
	Body,
	Controller,
	Delete,
	Get,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	Query,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { currentUser } from 'src/decorators/currentUser.decorator'
import { FileTypeEnum } from 'src/enum/files.enum'
import { CreateFileDto } from './dto/create-file.dto'
import { FilesService } from './files.service'
import { fileStorage } from './storage'

@Controller('files')
@ApiTags('FILES')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(
		@currentUser() userId: number,
		@Query('type') fileType: FileTypeEnum,
	) {
		return this.filesService.findAll(userId, fileType)
	}

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
		@currentUser() userId: number,
	) {
		return this.filesService.create(file, userId)
	}

	@Delete()
	remove(@currentUser() userId: number, @Query('ids') ids: string) {
		return this.filesService.remove(userId, ids)
	}
}
