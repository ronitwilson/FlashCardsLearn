import { Controller, Get, Param } from '@nestjs/common';
import { StatsService, UserStats } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('user/:userId')
  userStats(@Param('userId') userId: string): Promise<UserStats> {
    return this.statsService.computeForUser(userId);
  }
}
