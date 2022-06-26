import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  createdAt: Date;

  @OneToMany(() => Store, (store) => store.storeNumber)
  store: Store[];
}
