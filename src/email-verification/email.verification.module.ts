import { Module } from '@nestjs/common';
import { EmailVerificationController } from './presentation/email.verification.controller';
import { EmailVerificationService } from './application/email.verification.service';
import { EmailVerificationRepository } from './infra/email.verification.repository';
import { EmailVerification } from './domain/email.varification';

@Module({
  controllers: [EmailVerificationController],
  providers: [
    EmailVerificationRepository,
    EmailVerification,
    EmailVerificationService,
  ],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
