import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { DataInitService } from './helpers/DataInit';

@Module({
  imports: [RecipesModule],
  controllers: [AppController],
  providers: [AppService, DataInitService],
})
export class AppModule {}
