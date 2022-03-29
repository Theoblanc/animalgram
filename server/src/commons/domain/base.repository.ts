export interface BaseRepository<Entity, Model> {
  modelToEntity(model: Model): Entity;
  entityToModel(entity: Entity): Model;
}
