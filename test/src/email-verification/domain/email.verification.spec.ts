import { plainToInstance } from 'class-transformer';
import { EmailVerificationDto } from '../../../../src/email-verification/dto/email.verification.dto';
import { EmailVerification } from '../../../../src/email-verification/domain/email.varification';
import { EmailVerification as EmailVerificationEntity } from '../../../../src/email-verification/domain/entity/email.verification.entity';

describe('Email Verification 테스트', () => {
  const emailVerification = new EmailVerification();

  test('이메일 발송 기록이 없을 때 예외를 발생시킨다', async () => {
    const verificationEmailDto = plainToInstance(EmailVerificationDto, {
      email: 'test@test.com',
      verificationNumber: '123456',
    });

    expect(() => emailVerification.isValidate(verificationEmailDto, undefined)).toThrow('not exist verification record');
  });

  test('이메일 인증 번호가 다를 때 예외를 발생시킨다', async () => {
    const verificationEmailDto = plainToInstance(EmailVerificationDto, {
      email: 'test@test.com',
      verificationNumber: '123456',
    });
    const verificationRecord = plainToInstance(EmailVerificationEntity, {
      createdAt: Date.now(),
      key: '12345',
    });

    expect(() => emailVerification.isValidate(verificationEmailDto, verificationRecord)).toThrow('not equal verification number');
  });

  test('이메일 인증 시간이 10분 이내일 때 undefined를 반환한다', async () => {
    const verificationEmailDto = plainToInstance(EmailVerificationDto, {
      email: 'test@test.com',
      verificationNumber: '123456',
    });
    const verificationRecord = plainToInstance(EmailVerificationEntity, {
      createdAt: new Date(),
      key: '123456',
    });

    expect(emailVerification.isValidate(verificationEmailDto, verificationRecord)).toBeUndefined();
  });

  test('이메일 인증 시간이 10분을 넘었을 때 예외를 반환한다', async () => {
    const verificationEmailDto = plainToInstance(EmailVerificationDto, {
      email: 'test@test.com',
      verificationNumber: '123456',
    });

    const current = new Date();
    current.setHours(current.getHours() + 9);
    const verificationRecord = plainToInstance(EmailVerificationEntity, {
      createdAt: current,
      key: '123456',
    });

    expect(() => emailVerification.isValidate(verificationEmailDto, verificationRecord)).toThrow('verification time is over');
  });
});
