import {
  EmailSubject,
  EmailTemplate,
  IEmailNotification
} from 'src/commons/domain/notification/notification.interface';
import { Token } from 'src/token/domain/token';

export class SignInNotification {
  private email: IEmailNotification;
  private readonly verificationToken: Token;
  private readonly url: string;

  constructor(verificationToken: Token, url: string) {
    this.verificationToken = verificationToken;
    this.url = url;
    this.setEmail();
    this.verificationToken.send();
  }

  public toEmail(): IEmailNotification {
    return this.email;
  }

  private setEmail() {
    const { identifier } = this.verificationToken.properties();

    this.email = {
      to: identifier,
      subject: EmailSubject.SIGN_IN,
      template: EmailTemplate.SIGN_IN,
      context: {
        url: this.generateEmailUrl(this.url),
        email: identifier
      }
    };
  }

  private generateEmailUrl(baseUri: string): string {
    const { identifier, token } = this.verificationToken.properties();

    const emailEncoded = encodeURIComponent(identifier);
    const tokenEncoded = encodeURIComponent(token);
    const params = new URLSearchParams({
      token: tokenEncoded,
      email: emailEncoded
    });
    return `${baseUri}/api/v1/verification?${params}`;
  }
}
