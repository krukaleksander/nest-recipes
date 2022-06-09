import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RecipesModule } from '../src/recipes/recipes.module';

describe('Recipes (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RecipesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('/recipes/ingredients (GET)', () => {
    it('should return status 200', () => {
      return request(app.getHttpServer())
        .get('/recipes/ingredients')
        .expect(200);
    });
  });
});
