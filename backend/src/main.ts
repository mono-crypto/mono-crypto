import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './lib/exception-filter/http-exception.filter';

const httpsOptions = {
  key: fs.readFileSync('./certs/api.locals.mono-crypto.com/key.pem'),
  cert: fs.readFileSync('./certs/api.locals.mono-crypto.com/cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ https: httpsOptions }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3001);
}
bootstrap();
