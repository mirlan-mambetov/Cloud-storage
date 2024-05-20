'use client'

import { Tabs } from 'antd'
import { Login } from '../../components/auth/Login'
import { Register } from '../../components/auth/Register'
import style from './auth.module.scss'

export const Auth = () => {
	return (
		<div className={style.auth}>
			<Tabs
				items={[
					{
						label: 'Войти',
						key: '1',
						children: <Login />,
					},
					{
						label: 'Регистрация',
						key: '2',
						children: <Register />,
					},
				]}
			/>
		</div>
	)
}
