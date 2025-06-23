import { Test } from '@nestjs/testing';
import { DocumentsService } from './documents.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from 'src/database/entities/document.entity';

describe('DocumentsService', () => {
  let service: DocumentsService;

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((doc) => ({ id: 1, ...doc })),
    findOneBy: jest.fn().mockResolvedValue({ id: 1, title: 'Doc 1' }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: getRepositoryToken(Document),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should create a document', async () => {
    const result = await service.create({ title: 'Doc 1' }, 'path/to/file.pdf');
    expect(result.title).toBe('Doc 1');
    expect(result.filePath).toBe('path/to/file.pdf');
  });

  it('should find one document', async () => {
    const result = await service.findOne(1);
    expect(result.title).toBe('Doc 1');
  });
});
