import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ingestion')
@UseGuards(AuthGuard('jwt'))
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @ApiBearerAuth()
  @Post('trigger')
  trigger(@Req() req: any) {
    const userId = req.user.userId;
    return this.ingestionService.triggerIngestion(userId);
  }

  @ApiBearerAuth()
  @Get('status/:id')
  status(@Param('id') id: string) {
    return this.ingestionService.getStatus(id);
  }
}
