import { Test, TestingModule } from '@nestjs/testing';
import { TandasService } from './tandas.service';

describe('TandasService', () => {
  let service: TandasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TandasService],
    }).compile();

    service = module.get<TandasService>(TandasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
