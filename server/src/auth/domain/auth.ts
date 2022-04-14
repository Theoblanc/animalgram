import { AggregateRoot } from '@nestjs/cqrs';

export type AuthProperties = {
  accessToken?: string;
  refreshToken?: string;
};
export interface Auth {
  commit: () => void;
}

export class AuthImplement extends AggregateRoot implements Auth {
  private accessToken: string;
  private refreshToken: string;
  jwtSevice: any;

  constructor(properties: AuthProperties) {
    super();
    Object.assign(this, properties);
  }

  properties() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
}
