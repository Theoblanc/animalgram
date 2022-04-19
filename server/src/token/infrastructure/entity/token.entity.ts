import { AccountEntity } from 'src/account/infrastructure/entity/account.entity';
import { TokenTypeEnum } from 'src/commons/domain/enum/token-type.enum';
import { BaseEntity } from 'src/commons/infrastructure/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({
  name: 'tokens',
})
export class TokenEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  token?: string;

  @Column({
    type: 'enum',
    enum: TokenTypeEnum,
    nullable: true,
  })
  type?: TokenTypeEnum;

  @OneToOne(() => AccountEntity, (account) => account.token)
  account?: AccountEntity;

  @Column({ type: 'date', nullable: true })
  expiresIn?: Date;
}
