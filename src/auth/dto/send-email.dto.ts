// send-email.dto.ts
export class SendEmailDto {
    from?: { name: string; address: string } | string;
    recipients: { name: string; address: string }[];
    subject: string;
    html: string;
    placeholderReplacements?: Record<string, string>;
  }
  