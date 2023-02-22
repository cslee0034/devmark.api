import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';

const logDir = __dirname + '../../logs';

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, //30일치 로그파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  };
};

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'prod' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('Dev-mark', {
              prettyPrint: true,
            }),
          ),
        }),
        new winstonDaily(dailyOptions('info')),
        new winstonDaily(dailyOptions('warn')),
        new winstonDaily(dailyOptions('error')),
      ],
    }),
  });
  app.useStaticAssets(path.join(__dirname, '../../', 'uploads'), {
    // const app = await NestFactory.create<NestExpressApplication>
    // express 앱이라고 명시 해줘야 사용 가능.
    prefix: './img',
    // static file 제공 주소.
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
