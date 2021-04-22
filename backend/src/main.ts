import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const httpsOptions = {
  key: fs.readFileSync('./certs/api.locals.mono-crypto.com/key.pem'),
  cert: fs.readFileSync('./certs/api.locals.mono-crypto.com/cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ https: httpsOptions }),
  );
  await app.listen(3000);
}
bootstrap();
