import { Factory } from 'src/commons/domain/base.factory';
import { BaseRepository } from 'src/commons/domain/base.repository';

interface IModel<Properties> {
  properties: () => Properties;
}

export class BaseTypeORM<Entity, Model extends IModel<Entity>>
  implements BaseRepository<Entity, Model>
{
  constructor(readonly factory: Factory<Entity, Model>) {}

  modelToEntity(model: Model): Entity {
    return model.properties();
  }

  entityToModel(entity: Entity): Model {
    return this.factory.reconstitute(entity);
  }
}
