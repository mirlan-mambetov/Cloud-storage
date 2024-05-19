import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {
	@ApiProperty({
		default: 'example@mail.com',
	})
	email: string

	@ApiProperty({
		default: 'Example Name',
	})
	fullName: string

	@ApiProperty({
		default: 'example password',
	})
	password: string
}
