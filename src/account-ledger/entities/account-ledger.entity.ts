import { Account } from '../../account/entities/account.entity'; // Import the Account entity

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

import { ActionTypeEnum } from '../enums/action-type.enum';

@Entity()
export class AccountLedger extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, { nullable: true }) // Assuming Account is your account entity
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ nullable: true })
  cashBalanceBefore: number;

  @Column({ default: 0 })
  amount: number;

  @Column({ nullable: true })
  newCashBalance: number;

  @Column({ enum: ActionTypeEnum })
  actionType: ActionTypeEnum;

  @Column({ nullable: true })
  comments: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}