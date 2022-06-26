import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Owner } from 'src/entities/owner.entity';

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

  @Column()
  createdAt: Date;

  @ManyToOne(() => Owner, (owner) => owner.store)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;
}
