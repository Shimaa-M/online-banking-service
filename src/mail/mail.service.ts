import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailResponse } from './interfaces';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService) { }

  async sendSignUpMail(
    email: string,
    token: string,
  ): Promise<EmailResponse> {
    const response: EmailResponse = { status: 'success', error: null };
    const mailOptions = {
      from: 'AIB Bank <no-reply@TestBank.com>', // sender address
      to: email, // list of receivers
      subject: 'Email Verification', // Subject line
      html: `Dear ${email},
        <br>
      Thanks for registering at Test Bank. ${token} 
      is your verification code for Test Bank
      <br>
      Best Regards ”`,
    };

    try {
      let getTransporter = nodemailer.createTransport({
        service: 'gmail',
      auth: {
        user: this.configService.gmailFrom,
        pass: this.configService.gmailPassword,
      },
      });
      getTransporter.sendMail(mailOptions);
    } catch (error) {
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }
    return response;
  }
}
