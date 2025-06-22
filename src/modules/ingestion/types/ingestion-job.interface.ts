import { IngestionStatus } from './ingestion-status.enum';

export interface IngestionJob {
  id: string;
  userId: number;
  status: IngestionStatus;
  startedAt: Date;
  completedAt?: Date;
}