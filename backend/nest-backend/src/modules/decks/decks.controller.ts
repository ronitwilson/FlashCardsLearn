import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  create(@Body() body: { name: string; wordIds?: string[] }) {
    return this.decksService.create(body.name, body.wordIds || [], false);
  }

  @Post('generate')
  generate(@Body() body: { size: number; includeLearned?: boolean; includeUnlearned?: boolean }) {
    return this.decksService.generate(body.size, body.includeLearned ?? true, body.includeUnlearned ?? true);
  }

  @Get()
  findAll() { return this.decksService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.decksService.findOne(id); }
}
