import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ActionsEnum } from '../enums/actions.enums';
import { User } from '../../user/entities/user.entity';

@Entity()
export class SYSLog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: ActionsEnum })
  action: ActionsEnum;

  @Column({ nullable: true })
  note: string;
}