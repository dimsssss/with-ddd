/**
 * 하나의 aggregate당 하나의 repository를 두는 것이 원칙이지만
 * 초기에는 aggregate가 나올 정도의 email verification이 발전되지 않았기 때문에
 * 도메인마다 데이터베이스 사용이 필요하면 추가하고 model이 추가되면
 * 첫번째 줄에 원칙을 준수한다.
 *
 * 하나의 관계형 데이터베이스만 사용하기 때문에 repositry를 별도의 인터페이스를 분리하지 않는다.
 * 만약 다양한 data source가 추가되면 그때 interface를 추가한다
 *
 * repository대신 entitymanager, darasource를 사용하는 이유는 custom해서 사용하기 편해서다.
 */

import { EntityManager } from 'typeorm';
import { EmailVerification } from '../domain/entity/email.verification.entity';
import { Injectable } from '@nestjs/common';
import { EmailVerificationDto } from '../dto/email.verification.dto';

@Injectable()
export class EmailVerificationRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async findLastRow(verificationEmail: EmailVerificationDto) {
    try {
      const result = await this.entityManager
        .getRepository(EmailVerification)
        .find({
          where: { email: verificationEmail.email },
          order: { id: 'DESC' },
          take: 1,
        });
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  async update(verificationEmail: EmailVerification) {
    try {
      const { affected } = await this.entityManager
        .getRepository(EmailVerification)
        .update({ id: verificationEmail.id }, { isVerified: true });
      return affected;
    } catch (error) {
      throw error;
    }
  }
}
