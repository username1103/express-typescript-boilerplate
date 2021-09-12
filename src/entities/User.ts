import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BaseEntityWithTimeStamp } from './base/BaseEntityWithTimeStamp';
import { Token } from './Token';

@Entity()
export class User extends BaseEntityWithTimeStamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Token, (token) => token.id)
  tokens: Token[];
}
