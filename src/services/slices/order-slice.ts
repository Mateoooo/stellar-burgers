import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

interface OrderState {
  order: TOrder | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
  orderByNumber: TOrder | null;
  loadingOrderByNumber: boolean;
}

const initialState: OrderState = {
  order: null,
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null,
  orderByNumber: null,
  loadingOrderByNumber: false
};

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    const order: TOrder = {
      _id: response.order._id,
      status: response.order.status,
      name: response.order.name,
      createdAt: response.order.createdAt,
      updatedAt: response.order.updatedAt,
      number: response.order.number,
      ingredients: data
    };
    return order;
  }
);

export const getOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/getByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderModalData = null;
      state.orderRequest = false;
      state.isLoading = false;
      state.error = null;
      state.orderByNumber = null;
      state.loadingOrderByNumber = false;
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.orderModalData = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка создания заказа';
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loadingOrderByNumber = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loadingOrderByNumber = false;
        state.orderByNumber = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loadingOrderByNumber = false;
        state.error = action.error.message || 'Ошибка получения заказа';
      });
  }
});

export const { clearOrder, closeOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
