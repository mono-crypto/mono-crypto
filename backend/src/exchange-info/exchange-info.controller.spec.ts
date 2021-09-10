import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeInfoController } from './exchange-info.controller';
import { ExchangeInfoService } from './exchange-info.service';

describe('ExchangeInfoController', () => {
  let controller: ExchangeInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeInfoController],
      providers: [ExchangeInfoService],
    }).compile();

    controller = module.get<ExchangeInfoController>(ExchangeInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
