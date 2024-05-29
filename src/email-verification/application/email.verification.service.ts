import { Injectable } from '@nestjs/common';
import { EmailVerificationRepository } from '../infra/email.verification.repository';
import { EmailVerification } from '../domain/email.varification';
import { EmailVerificationDto } from '../dto/email.verification.dto';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly emailVerification: EmailVerification,
  ) {}

  async validate(emailVerificationDto: EmailVerificationDto) {
    const lastRecord = await this.emailVerificationRepository.findLastRow(emailVerificationDto);
    this.emailVerification.isValidate(emailVerificationDto, lastRecord);
    return await this.emailVerificationRepository.update(lastRecord);
  }
}
