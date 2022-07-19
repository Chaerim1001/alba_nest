import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  scheduleDate: Date;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => User, (user) => user.scheduleId, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
}
