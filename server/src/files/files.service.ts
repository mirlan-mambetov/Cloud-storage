import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileTypeEnum } from 'src/enum/files.enum'
import { Repository } from 'typeorm'
import { FileEntity } from './entities/file.entity'

@Injectable()
export class FilesService {
	// INITIAL QUERY BUILDER
	private readonly queryBuilderFile

	//
	constructor(
		@InjectRepository(FileEntity)
		private readonly respository: Repository<FileEntity>,
	) {
		this.queryBuilderFile = this.respository.createQueryBuilder('file')
	}

	/**
	 *
	 * @returns
	 */
	async findAll(userId: number, fileType: FileTypeEnum) {
		this.queryBuilderFile.where('file.userId = :userId', { userId })

		if (fileType === FileTypeEnum.PHOTOS) {
			this.queryBuilderFile.andWhere('file.mimeType ILIKE :type', {
				type: '%image%',
			})
		}
		if (fileType === FileTypeEnum.TRASH) {
			this.queryBuilderFile.withDeleted().andWhere('file.deletedAt IS NOT NULL')
		}

		return this.queryBuilderFile.getMany()
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

	/**
	 *
	 * @param userId
	 * @param ids
	 * @returns
	 */
	async remove(userId: number, ids: string) {
		const idsArray = ids.split(',')

		this.queryBuilderFile.where('id IN (:...ids) AND userId = :userId', {
			ids: idsArray,
			userId,
		})
		return this.queryBuilderFile.softDelete().execute()
	}
}
