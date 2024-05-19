import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './users.service'

@Controller('users')
@ApiTags('USERS')
export class UsersController {
	constructor(private readonly usersService: UserService) {}

	/**
	 * @returns Created user
	 */
	@Post()
	@HttpCode(HttpStatus.CREATED)
	create() {
		return 'created user'
	}
}
