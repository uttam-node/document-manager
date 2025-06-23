import { Injectable } from '@nestjs/common';
import { IngestionJob } from './types/ingestion-job.interface';
import { IngestionStatus } from './types/ingestion-status.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IngestionService {
  private jobs: Map<string, IngestionJob> = new Map();

  async triggerIngestion(userId: number): Promise<{ jobId: string }> {
    const jobId = uuidv4();
    const job: IngestionJob = {
      id: jobId,
      userId,
      status: IngestionStatus.PENDING,
      startedAt: new Date(),
    };

    this.jobs.set(jobId, job);
    this.simulateAsyncIngestion(jobId);

    return { jobId };
  }

  async simulateAsyncIngestion(jobId: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = IngestionStatus.IN_PROGRESS;
    this.jobs.set(jobId, job);

    // Simulate delay (5 sec)
    const timeout = setTimeout(() => {
      job.status = IngestionStatus.COMPLETED;
      job.completedAt = new Date();
      this.jobs.set(jobId, job);
    }, 5000);

    timeout.unref(); 
  }

  getStatus(jobId: string) {
    const job = this.jobs.get(jobId);
    if (!job) {
      return { status: 'NOT_FOUND' };
    }
    return job;
  }
}
