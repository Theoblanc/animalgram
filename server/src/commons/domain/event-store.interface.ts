export interface EventIdentity {
  id: string;
}

export interface EventStore {
  save<Properties extends EventIdentity>(
    event: Event<Properties>,
  ): Promise<void>;
}

export class Event<Properties> {
  readonly subject: string;
  readonly data: Properties;
}
