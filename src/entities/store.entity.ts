import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from './experience.entity';
import { Jobpost } from './jobpost.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  storeName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  storeNumber: string;

  @Column({ type: 'varchar', nullable: false })
  startDate: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @OneToMany(() => Experience, (experience) => experience.id)
  experienceId: Experience[];

  @OneToMany(() => Jobpost, (jobpost) => jobpost.id)
  jobpostId: Jobpost[];
}
