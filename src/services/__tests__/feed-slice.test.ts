import feedReducer, { fetchFeeds, initialState } from '../slices/feed-slice';
import { mockOrder } from '../__mocks__/mocks';

describe('feed slice', () => {
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
