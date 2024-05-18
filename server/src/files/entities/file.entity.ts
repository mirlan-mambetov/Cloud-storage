import { UserEntity } from 'src/users/entities/user.entity'
import {
	Column,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('files')
export class FileEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	fileName: string

	@Column()
	originalName: string

	@Column()
	size: number

	@Column()
	mimeType: string

	@DeleteDateColumn()
	deletedAt?: Date

	@ManyToOne(() => UserEntity, (user) => user.files)
	user: UserEntity
}
