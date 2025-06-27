import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/database/entities/document.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private docRepo: Repository<Document>,
  ) {}

  async create(dto: CreateDocumentDto, filePath: string) {
    const document = this.docRepo.create({ ...dto, filePath });
    return this.docRepo.save(document);
  }

  async findAll(search = '', page = 1, limit = 10) {
    return this.docRepo
      .createQueryBuilder('doc')
      .where('doc.title ILIKE :search', { search: `%${search}%` })
      .orderBy('doc.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findOne(id: number) {
    const doc = await this.docRepo.findOneBy({ id });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async update(id: number, dto: UpdateDocumentDto) {
    const doc = await this.findOne(id);
    Object.assign(doc, dto);
    return this.docRepo.save(doc);
  }

  async remove(id: number): Promise<void> {
    const doc = await this.docRepo.findOneBy({ id });
    if (!doc) throw new NotFoundException('Document not found');

    await this.docRepo.remove(doc);
  }
}
