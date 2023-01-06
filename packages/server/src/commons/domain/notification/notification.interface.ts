export enum EmailTemplate {
  SIGN_IN = 'd-a035ad5cfd6d46d3a234fe6501350237'
}

export enum EmailSubject {
  SIGN_IN = 'ANIMALGRAM'
}

export interface IEmailNotification {
  to: string;
  subject: string;
  template: EmailTemplate; // `.hbs` extension is appended automatically
  context: Record<string, any>; // ✏️ filling curly brackets with content
}

export interface INotification {
  toEmail?(): IEmailNotification;
}
