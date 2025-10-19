import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AttemptsService } from './attempts.service';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Post()
  record(@Body() body: { userId: string; wordId: string; deckId?: string; isCorrect: boolean }) {
    return this.attemptsService.record(body.userId, body.wordId, body.deckId, body.isCorrect);
  }

  @Get('user/:userId')
  byUser(@Param('userId') userId: string) { return this.attemptsService.findByUser(userId); }
}
