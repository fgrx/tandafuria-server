import { Test, TestingModule } from '@nestjs/testing';
import { TandasController } from './tandas.controller';

describe('Tandas Controller', () => {
  let controller: TandasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TandasController],
    }).compile();

    controller = module.get<TandasController>(TandasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
