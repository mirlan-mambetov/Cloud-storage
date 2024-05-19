import { Injectable } from '@nestjs/common'
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDTO } from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
	) {}

	/**
	 *
	 * @param email
	 * @returns
	 */
	async findByEmail(email: string) {
		try {
			const user = await this.repository.findOneBy({ email })
			return user
		} catch (error) {
			throw new ExceptionsHandler(error)
		}
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number) {
		return await this.repository.findOneBy({ id })
	}

	/**
	 *
	 * @param dto
	 * @returns
	 */
	async create(dto: CreateUserDTO) {
		return await this.repository.save(dto)
	}
}
