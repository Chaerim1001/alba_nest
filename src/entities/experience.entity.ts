import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './store.entity';
import { User } from './user.entity';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  period: string;

  @Column({ type: 'boolean', nullable: true })
  ongoing: boolean;

  @Column({ type: 'integer', nullable: false })
  result: number;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @ManyToOne(() => Store, (store) => store.experienceId)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @ManyToOne(() => User, (user) => user.experienceId)
  @JoinColumn({ name: 'userId' })
  user: User;
}
