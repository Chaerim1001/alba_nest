import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class Jobpost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ default: () => 'NOW()' })
  updatedAt: Date;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @ManyToOne(() => Store, (store) => store.jobpostId)
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
