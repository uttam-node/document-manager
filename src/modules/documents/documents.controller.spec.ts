import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

describe('DocumentsController', () => {
  let controller: DocumentsController;

  const mockDocumentsService = {
    create: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Test Doc',
      filePath: 'uploads/test.pdf',
    }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Doc' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Test Doc' }),
    update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Title' }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: DocumentsService,
          useValue: mockDocumentsService,
        },
      ],
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a document', async () => {
    const file = { path: 'uploads/test.pdf' } as Express.Multer.File;
    const dto = { title: 'Test Doc', description: 'desc' };
    const result = await controller.create(file, dto);
    expect(result).toHaveProperty('id');
  });

  it('should return all documents', async () => {
    const result = await controller.findAll('', 1, 10);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return one document', async () => {
    const result = await controller.findOne(1);
    expect(result.id).toBe(1);
  });

  it('should update document', async () => {
    const result = await controller.update(1, { title: 'Updated Title' });
    expect(result.title).toBe('Updated Title');
  });

  it('should delete document', async () => {
    const result = await controller.remove(1);
    expect(result).toBeUndefined();
  });
});
