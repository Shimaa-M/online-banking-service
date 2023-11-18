import { User } from '../../user/entities/user.entity'; // Import the User entity

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false }) // Assuming User is your user entity
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false,unique:true })
  cardID: string;

  @Column()
  accountNumber: string;

  @Column()
  accountHolderName: string;

  @Column({ default: 5000 })
  openingBalance: number;

  @Column({ default: 0 })
  closingBalance: number;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  opened: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
