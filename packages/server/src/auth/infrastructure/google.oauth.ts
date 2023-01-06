import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { GoogleOAuth } from '../domain/google.oauth';
import { google, people_v1 } from 'googleapis';

export class GogleOauthImpl implements GoogleOAuth {
  private readonly googleOAuth: OAuth2Client;
  private readonly logger: Logger;

  constructor(@Inject(ConfigService) private readonly config: ConfigService) {
    this.logger = new Logger(this.constructor.name);
    this.googleOAuth = new google.auth.OAuth2(
      this.config.get('GOOGLE_CLIENT_ID'),
      this.config.get('GOOGLE_SECRET'),
      this.config.get('REDIRECT_URL')
    );
  }
}
