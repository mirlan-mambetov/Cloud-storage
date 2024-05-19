import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateUserDTO } from 'src/users/dto/create-user.dto'
import { UserEntity } from 'src/users/entities/user.entity'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local.guard'

@Controller('auth')
@ApiTags('AUTH')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	@ApiBody({ type: CreateUserDTO })
	login(@Request() req) {
		return this.authService.login(req.user as UserEntity)
	}

	@Post('register')
	@ApiBody({ type: CreateUserDTO })
	register(@Body() dto: CreateUserDTO) {
		return this.authService.register(dto)
	}
}
