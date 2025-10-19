import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { AttemptsModule } from '../attempts/attempts.module';
import { WordsModule } from '../words/words.module';
import { DecksModule } from '../decks/decks.module';

@Module({
  imports: [AttemptsModule, WordsModule, DecksModule],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
