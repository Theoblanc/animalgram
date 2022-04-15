import Redis from 'ioredis';
import { AppService } from 'src/app.service';

export class EventStoreImplement {
  private readonly master: Redis.Redis;
  private readonly slave: Redis.Redis;

  constructor() {
    const { master, slave } = AppService.redisClusterConfig();
    this.master = new Redis(master.port, master.host).on(
      'error',
      this.failToConnectRedis,
    );
    this.slave = new Redis(slave.port, slave.host).on(
      'error',
      this.failToConnectRedis,
    );
  }

  private failToConnectRedis(error: Error): Promise<void> {
    console.error(error);
    process.exit(1);
  }
}
