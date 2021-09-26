import { Controller, Get } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get()
  async getHello(): Promise<any> {
    const res = await this.schedulerService.exchangeInfo().toPromise();

    const dto = {
      data: res.data,
    };

    return dto;
  }
}
