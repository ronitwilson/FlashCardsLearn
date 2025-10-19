import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  add(@Body() body: { text: string; difficulty?: string; deckIds?: string[] }) {
    return this.wordsService.add(body.text, body.difficulty, body.deckIds || []);
  }

  @Get()
  findAll() { return this.wordsService.findAll(); }

  @Get('search')
  search(@Query('q') q: string) { return this.wordsService.search(q || ''); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.wordsService.findOne(id); }
}
