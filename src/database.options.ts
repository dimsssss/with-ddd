import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default (configService: ConfigService): MysqlConnectionOptions => ({
  type: configService.get('DATABASE_DIRECT') || 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: Number(configService.get('DATABASE_PORT')),
  username: configService.get('DATABASE_USER'),
  password: String(configService.get('DATABASE_PASSWORD')),
  database: configService.get('DATABASE'),
  entities: [String(configService.get('ENTITIES'))],
});
