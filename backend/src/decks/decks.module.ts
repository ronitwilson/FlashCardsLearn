import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { Deck } from './entities/deck.entity';
import { FlashcardsModule } from '../flashcards/flashcards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deck]),
    FlashcardsModule,
  ],
  controllers: [DecksController],
  providers: [DecksService],
  exports: [DecksService],
})
export class DecksModule {}
