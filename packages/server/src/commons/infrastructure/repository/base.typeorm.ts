import { Factory } from 'src/commons/domain/base.factory';
import { BaseRepository } from 'src/commons/domain/base.repository';
import { v4 as uuidv4 } from 'uuid';

export interface IModel<Properties> {
  properties: () => Properties;
}

export class BaseTypeORM<Entity, Model extends IModel<Entity>>
  implements BaseRepository<Entity, Model>
{
  constructor(readonly factory: Factory<Entity, Model>) {}

  newId(): string {
    return uuidv4();
  }

  modelToEntity(model: Model): Entity {
    return model.properties();
  }

  entityToModel(entity: Entity): Model {
    return this.factory.reconstitute(entity);
  }
}
