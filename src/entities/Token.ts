import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, Timestamp } from 'typeorm';
import { BaseEntityWithTimeStamp } from './base/BaseEntityWithTimeStamp';
import { User } from './User';

@Entity()
export class Token extends BaseEntityWithTimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @ManyToOne((type) => User, (user) => user.tokens)
  user: User;

  @Column()
  expires: Date;
}
