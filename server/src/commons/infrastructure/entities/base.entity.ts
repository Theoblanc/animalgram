import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  VersionColumn,
  Entity,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @VersionColumn()
  version?: number;
}
