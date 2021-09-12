import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  getRepository,
  InsertResult,
} from 'typeorm';
import { Token } from './Token';

@Entity()
export class User {
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

  constructor(phone: string) {
    this.phone = phone;
  }

  save(): Promise<InsertResult> {
    return getRepository(User).insert(this);
  }
}
