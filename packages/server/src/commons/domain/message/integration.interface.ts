export class IntegrationEvent {
  readonly trigger: string;
  readonly payload: Record<string, string>;
}

export interface IntegrationEventPublisher {
  publish: (trigger: string, payload: Record<string, string>) => Promise<void>;
  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T>;
}
