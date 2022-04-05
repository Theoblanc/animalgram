import { BaseEntity } from 'src/commons/infrastructure/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'accounts',
})
export class AccountEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password?: string;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'int', default: 0 })
  balance: number;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  token?: string;
}
