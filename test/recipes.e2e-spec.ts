import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { RecipesModule } from '../src/recipes/recipes.module';
import * as superagent from 'superagent';

describe('Recipes (e2e)', () => {
  let app: INestApplication;
  let getFromServer: (
    endpoint: string,
    body?: Record<string, unknown>,
  ) => Promise<superagent.Response>;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RecipesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  beforeAll(function createCustomMethods() {
    getFromServer = async (endpoint, body?) => {
      return request(app.getHttpServer()).get(endpoint).send(body);
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
      'Dairy',
      'Produce',
      'Misc',
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
      expect(response.sort()).toMatchObject(ingredientsTypes.sort());
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
    it('should return limit out of range if limit is bigger than database length', async () => {
      const response = await getFromServer(`${endpoint}?limit=100`);
      expect(response.body).toEqual({
        statusCode: 400,
        message: 'limit out of range',
      });
    });
    it('should throw page out of range if there are no more pages in current limit', async () => {
      const response = await getFromServer(`${endpoint}?limit=9&page=2`);
      expect(response.body).toEqual({
        statusCode: 400,
        message: 'page out of range',
      });
    });
    it('should return 2 elements if limit 2 and page 3', async () => {
      const response = await getFromServer(`${endpoint}?limit=2&page=3`);
      expect(response.body).toHaveLength(2);
    });
    it('should return elements at index 4, 5, 6 and 7 if limit 4 and page 2', async () => {
      const response = await getFromServer(`${endpoint}?limit=4&page=2`);
      expect(response.body.sort((a, b) => a.id - b.id)).toMatchObject(
        [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }].sort(
          (a, b) => a.id - b.id,
        ),
      );
    });
  });
  describe('/recipes/time (GET)', () => {
    const endpoint = '/recipes/time';
    it('should return status 200', () => {
      return request(app.getHttpServer()).get(endpoint).expect(200);
    });
    it('should return  empty array if 0 time is passed', () => {
      return request(app.getHttpServer())
        .get(endpoint)
        .send({ time: 0 })
        .expect([]);
    });
    it('should return one recipe if time is 6', async () => {
      const { body: response } = await getFromServer(endpoint, { time: 6 });
      expect(response).toHaveLength(1);
    });
    it('should return five recipes if time is 60', async () => {
      const { body: response } = await getFromServer(endpoint, { time: 60 });
      expect(response).toHaveLength(5);
    });
  });
  describe('/recipes/single (GET)', () => {
    const endpoint = '/recipes/single';
    it('should return status 204, without any id', () => {
      return request(app.getHttpServer()).get(endpoint).expect(204);
    });
    it('should return one element if valid id is passed', async () => {
      const { body: response } = await getFromServer(endpoint, { id: 1 });
      expect(response).toHaveLength(1);
    });
    it('should return 204 no content if id is not in db', async () => {
      const response = await getFromServer(endpoint, { id: 999 });
      expect(response.statusCode).toEqual(204);
    });
  });
  describe('/recipes/byproduct (GET)', () => {
    const endpoint = '/recipes/byproduct';
    it('should return recipes with given single product', async () => {
      const { body: response } = await getFromServer(endpoint, {
        products: ['olive oil'],
      });
      expect(response[0].name).toBe('Roasted Asparagus');
    });
    it('should return recipes with given two products', async () => {
      const { body: response } = await getFromServer(endpoint, {
        products: ['olive oil', 'salt'],
      });
      expect(response).toHaveLength(0);
    });
  });
});
