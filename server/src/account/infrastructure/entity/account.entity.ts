import { BaseEntity } from 'src/commons/infrastructure/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class AccountEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password?: string;

  @Column({ type: 'varchar' })
  name?: string;
}
