import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateUserDTO } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('AUTH')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UseGuards(AuthGuard('local'))
	@ApiBody({ type: CreateUserDTO })
	login(@Request() req) {
		console.log(req.user)
	}

	@Post('register')
	register(@Body() dto: CreateUserDTO) {
		return this.authService.register(dto)
	}
}
