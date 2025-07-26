import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 100 })
  full_name: string;

  @Column()
  email: string;

  @Column({ default: 'Technician' })
  role: string;

  @Column({ nullable: true })
  job_title: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'datetime', nullable: true })
  last_login: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
