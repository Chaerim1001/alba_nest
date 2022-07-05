import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './store.entity';
import { Experience } from './experience.entity';

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

  @OneToMany(() => Experience, (experience) => experience.id)
  experienceId: Experience[];
}
