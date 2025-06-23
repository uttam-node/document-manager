import { Test, TestingModule } from '@nestjs/testing';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';

describe('IngestionController', () => {
  let controller: IngestionController;

  const mockIngestionService = {
    triggerIngestion: jest.fn().mockResolvedValue({ jobId: 'job123' }),
    getStatus: jest.fn().mockReturnValue({ status: 'COMPLETED' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [
        {
          provide: IngestionService,
          useValue: mockIngestionService,
        },
      ],
    }).compile();

    controller = module.get<IngestionController>(IngestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should trigger ingestion job', async () => {
    const req = { user: { userId: 1 } };
    const result = await controller.trigger(req);
    expect(result).toEqual({ jobId: 'job123' });
  });

  it('should return ingestion job status', () => {
    const result = controller.status('job123');
    expect(result.status).toBe('COMPLETED');
  });
});
