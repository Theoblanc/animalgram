export interface Factory<Properties, Model> {
  reconstitute(properties: Properties): Model;
}
