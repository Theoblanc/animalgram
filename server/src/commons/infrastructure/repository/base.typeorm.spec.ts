import { BaseEntity } from '../entities/base.entity';
import { BaseTypeORM } from './base.typeorm';

const propertiesStub: BaseEntity = {
  id: 'mock_id',
  version: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

describe('BaseTypeORM', () => {
  beforeEach(() => {});
});
