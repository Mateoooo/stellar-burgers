import profileOrdersReducer, {
  fetchProfileOrders,
  clearProfileOrders
} from '../slices/profile-orders-slice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Заказ',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
  number: 123,
  ingredients: ['1', '2']
};

describe('profileOrders slice', () => {
  const initialState = { orders: [], isLoading: false, error: null };

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
