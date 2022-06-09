import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RecipesModule } from '../src/recipes/recipes.module';
import * as superagent from 'superagent';

describe('Recipes (e2e)', () => {
  let app: INestApplication;
  let getFromServer: (endpoint: string) => Promise<superagent.Response>;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RecipesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  beforeAll(function createCustomMethods() {
    getFromServer = async (endpoint) => {
      return request(app.getHttpServer()).get(endpoint);
    };
  });
  describe('/recipes/ingredients (GET)', () => {
    const endpoint = '/recipes/ingredients';
    it('should return status 200', () => {
      return request(app.getHttpServer()).get(endpoint).expect(200);
    });
    it('should return array of strings', async () => {
      const { body: response } = await getFromServer(endpoint);
      expect(response).toEqual(expect.arrayContaining([expect.any(String)]));
    });
    it('should return array of unique strings', async () => {
      const { body: response } = await getFromServer(endpoint);
      expect(new Set(response).size === response.length).toBe(true);
    });
  });
  describe('/recipes/ingredients/types (GET)', () => {
    const endpoint = '/recipes/ingredients/types';
    const ingredientsTypes = [
      'Meat',
      'Baking',
      'Condiments',
      'Drinks',
      'Produce',
      'Misc',
      'Dairy',
    ];
    it('should return status 200', () => {
      return request(app.getHttpServer()).get(endpoint).expect(200);
    });
    it('should return array of strings', async () => {
      const { body: response } = await getFromServer(endpoint);
      expect(response).toEqual(expect.arrayContaining([expect.any(String)]));
    });
    it('should return array of unique strings', async () => {
      const { body: response } = await getFromServer(endpoint);
      expect(new Set(response).size === response.length).toBe(true);
    });
    it('should match array of ingredient types', async () => {
      const { body: response } = await getFromServer(endpoint);
      expect(response).toEqual(ingredientsTypes);
    });
  });
  describe('/recipes (GET)', () => {
    const endpoint = '/recipes';
    it('should return status 200', () => {
      return request(app.getHttpServer()).get(endpoint).expect(200);
    });
    it('should return 3 recipes if limit is set to 3', async () => {
      const { body: response } = await getFromServer(`${endpoint}?limit=3`);
      expect(response).toHaveLength(3);
    });
  });
});
