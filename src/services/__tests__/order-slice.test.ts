import orderReducer, {
  createOrder,
  getOrderByNumber,
  clearOrder,
  closeOrderModal
} from '../slices/order-slice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order1',
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
  number: 12345,
  ingredients: ['1', '2']
};

describe('order slice', () => {
  const initialState = {
    order: null,
    orderRequest: false,
    orderModalData: null,
    isLoading: false,
    error: null,
    orderByNumber: null,
    loadingOrderByNumber: false
  };

  it('createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const newState = orderReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('createOrder.fulfilled', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const newState = orderReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.order).toEqual(mockOrder);
    expect(newState.orderModalData).toEqual(mockOrder);
    expect(newState.orderRequest).toBe(false);
  });

  it('createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка' }
    };
    const newState = orderReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('Ошибка');
  });

  it('getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const newState = orderReducer(initialState, action);
    expect(newState.loadingOrderByNumber).toBe(true);
  });

  it('getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const newState = orderReducer(initialState, action);
    expect(newState.loadingOrderByNumber).toBe(false);
    expect(newState.orderByNumber).toEqual(mockOrder);
  });

  it('getOrderByNumber.rejected', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка' }
    };
    const newState = orderReducer(initialState, action);
    expect(newState.loadingOrderByNumber).toBe(false);
    expect(newState.error).toBe('Ошибка');
  });

  it('clearOrder', () => {
    const filledState = {
      ...initialState,
      order: mockOrder,
      orderModalData: mockOrder,
      orderRequest: true
    };
    const action = clearOrder();
    const newState = orderReducer(filledState, action);
    expect(newState.order).toBeNull();
    expect(newState.orderModalData).toBeNull();
    expect(newState.orderRequest).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.orderByNumber).toBeNull();
    expect(newState.loadingOrderByNumber).toBe(false);
  });

  it('closeOrderModal', () => {
    const filledState = { ...initialState, orderModalData: mockOrder };
    const action = closeOrderModal();
    const newState = orderReducer(filledState, action);
    expect(newState.orderModalData).toBeNull();
  });
});
