import { Injectable } from '@nestjs/common';
import { AppService, RabbitMQConfig } from 'src/app.service';
import { Channel, connect, Connection } from 'amqplib';

import { IntegrationEvent, IntegrationEventPublisher } from 'src/commons/domain/integration.interface';

@Injectable()
export class IntegrationEventPublisherImplement implements IntegrationEventPublisher {
  private static exchange: string;
  private readonly promisedChannel: Promise<Channel>;

  constructor() {
    const config = AppService.rabbitMQConfig();
    IntegrationEventPublisherImplement.exchange = config.exchange;
    this.promisedChannel = IntegrationEventPublisherImplement.connect(config);
  }

  async publish(message: IntegrationEvent): Promise<void> {
    await this.promisedChannel.then((channel) =>
      channel.publish(
        IntegrationEventPublisherImplement.exchange,
        message.subject,
        Buffer.from(JSON.stringify(message.data))
      )
    );
  }
  private static async connect(config: RabbitMQConfig): Promise<Channel> {
    return connect(config)
      .then((connection: Connection) => IntegrationEventPublisherImplement.createChannel(connection))
      .then((channel: Channel) => IntegrationEventPublisherImplement.assertExchange(channel))
      .catch(() => IntegrationEventPublisherImplement.connect(config));
  }

  private static async createChannel(connection: Connection): Promise<Channel> {
    return connection.createChannel();
  }

  private static async assertExchange(channel: Channel): Promise<Channel> {
    await channel.assertExchange(IntegrationEventPublisherImplement.exchange, 'topic', {
      durable: true
    });
    return channel;
  }
}
