import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Experience } from './experience.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  userId: string;

  @Column({ type: 'varchar', nullable: false })
  pwd: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'date', nullable: false })
  birth: Date;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @OneToMany(() => Experience, (experience) => experience.id)
  experienceId: Experience[];
}
