import { IAuthLoginDTO } from '@/api/dto/auth.dto'
import { authApi } from '@/api/index'
import { Button, Form, FormProps, Input, notification } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { setCookie } from 'nookies'

export const Login = () => {
	const handleSubmit: FormProps<IAuthLoginDTO>['onFinish'] = async (values) => {
		try {
			const { token } = await authApi.login(values)
			notification.success({
				message: 'Авторизация прошла успешно',
				description: 'Перенаправляем',
				duration: 1,
			})
			setCookie(null, '_token', token, {
				path: '/',
			})
		} catch (error) {
			console.warn('LoginForm', error)
			notification.error({
				// @ts-ignore
				message: String(error?.message),
				duration: 1,
			})
		}
	}

	return (
		<Form
			name="login"
			labelCol={{
				span: 8,
			}}
			onFinish={handleSubmit}
		>
			<FormItem
				label="E-mail"
				name="email"
				rules={[
					{
						required: true,
						message: 'E-mail is required!',
					},
				]}
				children={<Input />}
			/>

			<FormItem
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: 'Password is required',
					},
				]}
				children={<Input.Password />}
			/>
			<FormItem
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
				children={<Button type="primary" htmlType="submit" children="Войти" />}
			/>
		</Form>
	)
}
