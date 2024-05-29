import { Body, Controller, Patch } from '@nestjs/common';
import { EmailVerificationService } from '../application/email.verification.service';
import { EmailVerificationDto } from '../dto/email.verification.dto';

@Controller('/api/v1/email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Patch('/')
  async verificateEmail(@Body() emailVerificationDto: EmailVerificationDto) {
    return await this.emailVerificationService.validate(emailVerificationDto);
  }
}
