export class IntegrationEvent {
  readonly trigger: string;
  readonly payload: Record<string, string>;
}

export interface IntegrationEventPublisher {
  publish: (trigger: string, payload: any) => Promise<void>;
  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T>;
}
