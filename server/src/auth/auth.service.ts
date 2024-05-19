import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common'
import argon2 from 'argon2'
import { CreateUserDTO } from 'src/users/dto/create-user.dto'
import { UserService } from 'src/users/users.service'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	/**
	 *
	 * @param email
	 * @param password
	 * @returns
	 */
	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findByEmail(email)

		if (user.password !== password) {
			throw new BadRequestException("Password don't match!")
		}
		return user
	}

	/**
	 *
	 * @param dto
	 * @returns
	 */
	async register(dto: CreateUserDTO) {
		try {
			return await this.userService.create(dto)
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	/**
	 *
	 * @param password
	 * @returns Hashed Password
	 */
	private async hashedPassword(password: string): Promise<string> {
		const hashedPassword = await argon2.hash(password, { hashLength: 10 })
		return hashedPassword
	}
}
