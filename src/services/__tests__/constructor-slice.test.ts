import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  restoreConstructor,
  TConstructorIngredient
} from '../slices/constructor-slice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
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

const mockBun: TIngredient = {
  ...mockIngredient,
  _id: 'bun1',
  name: 'Тестовая булка',
  type: 'bun'
};

describe('constructor slice', () => {
  const initialState = { bun: null, ingredients: [] };

  it('addIngredient: добавляет булку', () => {
    const action = addIngredient(mockBun);
    const newState = constructorReducer(initialState, action);
    expect(newState.bun).toMatchObject({ ...mockBun, id: expect.any(String) });
    expect(newState.ingredients).toHaveLength(0);
  });

  it('addIngredient: добавляет начинку', () => {
    const action = addIngredient(mockIngredient);
    const newState = constructorReducer(initialState, action);
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: expect.any(String)
    });
  });

  it('removeIngredient: удаляет ингредиент по id', () => {
    const state = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: '123' }
      ] as TConstructorIngredient[]
    };
    const action = removeIngredient('123');
    const newState = constructorReducer(state, action);
    expect(newState.ingredients).toHaveLength(0);
  });

  it('moveIngredient: меняет порядок начинок', () => {
    const state = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'first' },
        { ...mockIngredient, id: 'second' }
      ] as TConstructorIngredient[]
    };
    const action = moveIngredient({ from: 0, to: 1 });
    const newState = constructorReducer(state, action);
    expect(newState.ingredients[0].id).toBe('second');
    expect(newState.ingredients[1].id).toBe('first');
  });

  it('clearConstructor: очищает всё', () => {
    const filledState = {
      bun: { ...mockBun, id: 'bun' } as TConstructorIngredient,
      ingredients: [
        { ...mockIngredient, id: '123' }
      ] as TConstructorIngredient[]
    };
    const action = clearConstructor();
    const newState = constructorReducer(filledState, action);
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });

  it('restoreConstructor: восстанавливает состояние', () => {
    const restored = {
      bun: { ...mockBun, id: 'bun' } as TConstructorIngredient,
      ingredients: [
        { ...mockIngredient, id: '123' }
      ] as TConstructorIngredient[]
    };
    const action = restoreConstructor(restored);
    const newState = constructorReducer(initialState, action);
    expect(newState).toEqual(restored);
  });
});
