import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { FlashcardsModule } from '../flashcards/flashcards.module';
import { UsersModule } from '../users/users.module';
import { DecksModule } from '../decks/decks.module';

@Module({
  imports: [
    FlashcardsModule,
    UsersModule,
    DecksModule,
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
