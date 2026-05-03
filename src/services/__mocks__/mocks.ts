import { TIngredient, TOrder, TUser } from '@utils-types';

export const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Тестовый ингредиент',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: 'test.jpg',
  image_large: 'test-large.jpg',
  image_mobile: 'test-mobile.jpg'
};

export const mockBun: TIngredient = {
  ...mockIngredient,
  _id: 'bun1',
  name: 'Тестовая булка',
  type: 'bun',
  price: 50
};

export const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Заказ',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
  number: 123,
  ingredients: ['1', '2']
};

export const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};
