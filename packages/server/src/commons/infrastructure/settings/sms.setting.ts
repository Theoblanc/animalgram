import { ConfigService } from '@nestjs/config';
import { SendGridModuleOptions } from '@ntegral/nestjs-sendgrid';

export async function smsFactory(config: ConfigService): Promise<SendGridModuleOptions> {
  return {
    apiKey: config.get('SENDGRID_API_KEY')
  };
}
