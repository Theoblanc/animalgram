import Redis from 'ioredis';
import { AppService } from 'src/app.service';
import {
  Event,
  EventIdentity,
  EventStore,
} from 'src/commons/domain/event-store.interface';

export class EventStoreImplement implements EventStore {
  private readonly master: Redis.Redis;

  constructor() {
    const { master } = AppService.redisClusterConfig();
    this.master = new Redis(master.port, master.host).on(
      'error',
      (error: Error) => this.failToConnectRedis(error),
    );
  }
  async save<Properties extends EventIdentity>(
    event: Event<Properties>,
  ): Promise<void> {
    await this.master.set(event.data.id, JSON.stringify(event.data));
  }

  async set(key: string, value: string): Promise<void> {
    await this.master.set(key, value, 'EX', 1);
  }

  async get(key: string): Promise<string | null> {
    return this.master.get(key).then((result: string) => result);
  }

  private failToConnectRedis(error: Error): void {
    console.error(error);
    process.exit(1);
  }
}
