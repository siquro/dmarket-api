import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column() firstName: string;

  @Column() lastName: string;

  @Column({ default: false }) emailVerified: boolean;

  @Column() emailToken: string;

  @CreateDateColumn() createdAt: Date;
}
