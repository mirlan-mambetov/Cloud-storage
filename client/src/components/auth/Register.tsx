import { IAuthRegisterDTO } from '@/api/dto/auth.dto'
import { authApi } from '@/api/index'
import { Button, Form, FormProps, Input, notification } from 'antd'
import FormItem from 'antd/es/form/FormItem'

export const Register = () => {
	const handleSubmit: FormProps<IAuthRegisterDTO>['onFinish'] = async (
		values
	) => {
		try {
			const user = await authApi.register(values)
			console.log(user)
			notification.success({
				message: 'Регистрация прошла успешно',
				description: 'Войдите',
				duration: 2,
			})
		} catch (error) {
			console.warn('RegisterForm', error)
			notification.error({
				// @ts-ignore
				message: String(error?.message),
				duration: 1,
			})
		}
	}

	return (
		<Form
			name="register"
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
				label="FullName"
				name="fullName"
				rules={[
					{
						required: true,
						message: 'FullName is required!',
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
				children={
					<Button type="primary" htmlType="submit" children="Регистрация" />
				}
			/>
		</Form>
	)
}
