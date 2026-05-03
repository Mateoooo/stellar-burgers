import profileOrdersReducer, {
  fetchProfileOrders,
  clearProfileOrders,
  initialState
} from '../slices/profile-orders-slice';
import { mockOrder } from '../__mocks__/mocks';

describe('profileOrders slice', () => {
  it('fetchProfileOrders.pending', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const newState = profileOrdersReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('fetchProfileOrders.fulfilled', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: [mockOrder]
    };
    const newState = profileOrdersReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual([mockOrder]);
  });

  it('fetchProfileOrders.rejected', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      error: { message: 'Ошибка' }
    };
    const newState = profileOrdersReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка');
  });

  it('clearProfileOrders', () => {
    const filledState = { ...initialState, orders: [mockOrder] };
    const action = clearProfileOrders();
    const newState = profileOrdersReducer(filledState, action);
    expect(newState.orders).toHaveLength(0);
  });
});
