import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * @returns Created user
	 */
	@Post()
	@HttpCode(HttpStatus.CREATED)
	create() {
		return 'created user'
	}
}
