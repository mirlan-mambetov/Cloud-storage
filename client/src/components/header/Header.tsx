'use client'

import { CloudOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout, Menu, Popover } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import style from './header.module.scss'

export const Header = () => {
	const { push } = useRouter()
	const pathName = usePathname()
	return (
		<Layout.Header className={style.header}>
			<Link href={'/'} className={style.logo}>
				<CloudOutlined />
				<strong>Cloud Storage</strong>
			</Link>
			<Menu
				style={{ background: 'hsl(298, 78%, 32%)' }}
				mode="horizontal"
				theme="dark"
				defaultSelectedKeys={[pathName]}
				onSelect={({ key }) => push(`${key}`)}
				items={[
					{
						key: '/',
						label: 'Home',
					},
					{
						key: '/user',
						label: 'Profile',
					},
				]}
			/>
			<div className={style.user}>
				<Popover
					content={
						<Button type="primary" danger>
							Выйти
						</Button>
					}
				>
					<Avatar>A</Avatar>
				</Popover>
			</div>
		</Layout.Header>
	)
}
