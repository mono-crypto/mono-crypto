import { Test, TestingModule } from '@nestjs/testing';
import { IexCloudService } from './iex-cloud.service';

describe('IexCloudService', () => {
  let service: IexCloudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IexCloudService],
    }).compile();

    service = module.get<IexCloudService>(IexCloudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
