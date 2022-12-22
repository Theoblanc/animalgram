import { ObjectType } from '@nestjs/graphql';
import { BaseError } from 'src/commons/domain/error/base.error';

@ObjectType()
export class UserNotFoundError extends BaseError {}
