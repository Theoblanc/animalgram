export interface BaseRepository<Entity, Model> {
  newId(): string;
  modelToEntity(model: Model): Entity;
  entityToModel(entity: Entity): Model;
}
