import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardsService } from './flashcards.service';
import { Flashcard } from './entities/flashcard.entity';
import { Attempt } from './entities/attempt.entity';
import { AttemptsService } from './attempts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flashcard, Attempt])],
  controllers: [FlashcardsController],
  providers: [FlashcardsService, AttemptsService],
  exports: [FlashcardsService, AttemptsService],
})
export class FlashcardsModule {}
