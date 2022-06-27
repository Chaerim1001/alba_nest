import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  ownerID: string;

  @Column({ type: 'varchar', nullable: false })
  pwd: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @OneToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
