import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Jobpost } from './jobpost.entity';
import { Store } from './store.entity';
import { User } from './user.entity';
import { ApplicationDocuments } from './applicationdocuments.entity';

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

  @ManyToOne(() => User, (user) => user.experienceId, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Jobpost, (jobpost) => jobpost.experienceId, { eager: true })
  @JoinColumn({ name: 'postId' })
  jobpost: Jobpost;

  @ManyToOne(() => ApplicationDocuments, (doc) => doc.experienceId, {
    eager: true,
  })
  @JoinColumn({ name: 'docId' })
  applicationDocuments: ApplicationDocuments;
}
