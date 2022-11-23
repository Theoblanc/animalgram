import { JwtService, JwtSignOptions } from '@nestjs/jwt';

export class JWTTokenSevice {
  constructor(private jwtSevice: JwtService) {}

  sign(payload: string | Buffer | object, options?: JwtSignOptions) {
    return this.jwtSevice.sign(payload, options);
  }
}
