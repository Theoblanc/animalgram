import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      path: '/api/graphql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: '/api/graphql'
        }
      }
    };
  }
}
