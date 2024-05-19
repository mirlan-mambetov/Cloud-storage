import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const currentUser = createParamDecorator(
	(_: unknown, ctx: ExecutionContext): number | null => {
		const request = ctx.switchToHttp().getRequest()
		return request.user?.id ? Number(request.user.id) : null
	},
)
