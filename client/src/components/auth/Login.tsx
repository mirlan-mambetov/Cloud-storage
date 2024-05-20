import { Button, Form, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'

export const Login = () => {
	return (
		<Form
			name="basic"
			labelCol={{
				span: 8,
			}}
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
