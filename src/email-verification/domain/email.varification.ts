import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { EmailVerificationDto } from '../dto/email.verification.dto';
import { EmailVerification as EmailVerificationEntity } from './entity/email.verification.entity';

@Injectable()
export class EmailVerification {
  private isMatch(
    request: EmailVerificationDto,
    original: EmailVerificationEntity,
  ) {
    return request.verificationNumber === original.key;
  }

  private isTimeOver(requestAt:Date, current:Date) {
    const originalMoment = moment(requestAt);
    const nowMoment = moment(current);
    return moment.duration(nowMoment.diff(originalMoment)).asMinutes() > 10;
  }

  isValidate(request: EmailVerificationDto, original?: EmailVerificationEntity) {
    if (!original) {
      throw new Error('not exist verification record');
    }

    if (!this.isMatch(request, original)) {
      throw new Error('not equal verification number');
    }

    if (this.isTimeOver(new Date(), original.createdAt)) {
      throw new Error('verification time is over');
    }
  }
}
