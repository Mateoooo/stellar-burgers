import feedReducer, { fetchFeeds } from '../slices/feed-slice';
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

describe('feed slice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  it('fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const newState = feedReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('fetchFeeds.fulfilled', () => {
    const payload = { orders: [mockOrder], total: 100, totalToday: 5 };
    const action = { type: fetchFeeds.fulfilled.type, payload };
    const newState = feedReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual([mockOrder]);
    expect(newState.total).toBe(100);
    expect(newState.totalToday).toBe(5);
  });

  it('fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка' }
    };
    const newState = feedReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка');
  });
});
