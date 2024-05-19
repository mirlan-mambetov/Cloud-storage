import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { currentUser } from 'src/decorators/currentUser.decorator'
import { UserService } from './users.service'

@Controller('users')
@ApiTags('USERS')
@ApiBearerAuth()
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

	/**
	 *
	 * @param id
	 * @returns USER PROFILE
	 */
	@Get('profile')
	@UseGuards(JwtAuthGuard)
	getProfile(@currentUser() id: number) {
		return this.usersService.findById(id)
	}
}
