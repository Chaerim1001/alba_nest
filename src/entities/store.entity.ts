import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
