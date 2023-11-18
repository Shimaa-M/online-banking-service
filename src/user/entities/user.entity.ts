import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { RolesEnum } from '../enums/roles.enum';
import { ProfileStatusEnum } from '../enums/profile-status.enum';

@Entity()
export class User  extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true, select: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'enum', enum: RolesEnum, default: RolesEnum.CUSTOMER })
  role: RolesEnum;

  //Uncomment the following lines if you want to use enum and status store
  @Column({ type: 'enum', enum: ProfileStatusEnum,default:ProfileStatusEnum.ACTIVE })
  //@StateStore(PROFILE_STATUS)
  status: ProfileStatusEnum;

  @Column({ type: String, nullable: true,select:false})
  verificationCode: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;
}