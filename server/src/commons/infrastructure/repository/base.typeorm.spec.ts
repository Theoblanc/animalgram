import { BaseRepository } from 'src/commons/domain/base.repository';
import { BaseEntity } from '../entities/base.entity';
import { BaseTypeORM, IModel } from './base.typeorm';

interface BaseModel {}

describe('BaseTypeORM', () => {
  const propertiesStub: BaseEntity = {
    id: 'mock_id',
    version: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  };

  let baseTypeorm: BaseRepository<BaseEntity, IModel<BaseEntity>>;

  describe('newID', () => {
    const spyFn = jest.spyOn(baseTypeorm, 'newId');

    baseTypeorm.newId();

    expect(spyFn).toBeCalledTimes(1);
  });
});
