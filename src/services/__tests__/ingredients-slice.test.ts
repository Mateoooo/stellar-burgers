import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../slices/ingredients-slice';
import { mockIngredient } from '../__mocks__/mocks';

describe('ingredients slice', () => {
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
