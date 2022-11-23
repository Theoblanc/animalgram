import Redis, { RedisKey } from 'ioredis';
import { AppService } from 'src/app.service';
import {
  Event,
  EventIdentity,
  EventStore,
} from 'src/commons/domain/event-store.interface';

export class EventStoreImplement implements EventStore {
  private readonly master: Redis;

  constructor() {
    const { master } = AppService.redisClusterConfig();
    this.master = new Redis({
      port: master.port,
      host: master.host,
      role: 'master',
      name: 'eventstore',
    });
  }
  async save<Properties extends EventIdentity>(
    event: Event<Properties>,
  ): Promise<void> {
    const key: RedisKey = event.data.id;
    const value: string | Buffer | number = JSON.stringify(event);
    const result = await this.set(key, value);
    console.log(result);
  }

  async set(key: RedisKey, value: string): Promise<void> {
    await this.master
      .set(key, value, 'EX', 10)
      .then((result: 'OK') => result)
      .catch((error: Error) => this.failToConnectRedis(error));
  }

  async get(key: RedisKey): Promise<string | unknown> {
    return await this.master
      .get(key)
      .then((result: string) => result)
      .catch((error: Error) => this.failToConnectRedis(error));
  }

  private failToConnectRedis(error: Error): void {
    console.error(error);
    process.exit(1);
  }
}
