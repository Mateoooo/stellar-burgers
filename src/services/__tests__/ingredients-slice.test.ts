import ingredientsReducer, {
  fetchIngredients
} from '../slices/ingredients-slice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Тест',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: 'test.jpg',
  image_large: 'test.jpg',
  image_mobile: 'test.jpg'
};

describe('ingredients slice', () => {
  const initialState = { ingredients: [], isLoading: false, error: null };

  it('fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [mockIngredient]
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toEqual([mockIngredient]);
    expect(newState.error).toBeNull();
  });

  it('fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' }
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка');
  });
});
