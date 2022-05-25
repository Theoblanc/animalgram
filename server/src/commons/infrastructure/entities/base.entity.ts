import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  VersionColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @VersionColumn()
  version?: number;
}
