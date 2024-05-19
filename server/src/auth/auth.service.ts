import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { CreateUserDTO } from 'src/users/dto/create-user.dto'
import { UserEntity } from 'src/users/entities/user.entity'
import { UserService } from 'src/users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 *
	 * @param email
	 * @param password
	 * @returns
	 */
	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findByEmail(email)

		const comparePassword = await argon.verify(user.password, password)
		if (!comparePassword) {
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
			const isExist = await this.userService.findByEmail(dto.email)
			if (isExist) throw new BadRequestException('User is already exist')
			const hashedPassword = await this.hashedPassword(dto.password)
			return await this.userService.create({
				...dto,
				password: hashedPassword,
			})
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	/**
	 *
	 * @param user
	 * @returns
	 */
	async login(user: UserEntity) {
		return {
			token: this.jwtService.sign({ id: user.id }),
		}
	}

	/**
	 *
	 * @param password
	 * @returns Hashed Password
	 */
	private async hashedPassword(password: string): Promise<string> {
		const hashedPassword = await argon.hash(password, { hashLength: 10 })
		return hashedPassword
	}
}
