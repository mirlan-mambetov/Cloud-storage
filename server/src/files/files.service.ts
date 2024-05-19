import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileTypeEnum } from 'src/enum/files.enum'
import { Repository } from 'typeorm'
import { FileEntity } from './entities/file.entity'

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(FileEntity)
		private readonly respository: Repository<FileEntity>,
	) {}

	/**
	 *
	 * @returns
	 */
	async findAll(userId: number, fileType: FileTypeEnum) {
		const queryBuilder = this.respository.createQueryBuilder('file')
		queryBuilder.where('file.userId = :userId', { userId })

		if (fileType === FileTypeEnum.PHOTOS) {
			queryBuilder.andWhere('file.mimeType ILIKE :type', {
				type: '%image%',
			})
		}
		if (fileType === FileTypeEnum.TRASH) {
			queryBuilder.withDeleted().andWhere('file.deletedAt IS NOT NULL')
		}

		return queryBuilder.getMany()
	}

	/**
	 *
	 * @param file
	 * @param userId
	 * @returns
	 */
	async create(file: Express.Multer.File, userId: number) {
		return await this.respository.save({
			fileName: file.filename,
			originalName: file.originalname,
			mimeType: file.mimetype,
			size: file.size,
			user: {
				id: userId,
			},
		})
	}
}
