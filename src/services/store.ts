import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';
import userReducer from './slices/user-slice';
import feedReducer from './slices/feed-slice';
import constructorReducer from './slices/constructor-slice';
import profileOrdersReducer from './slices/profile-orders-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer,
  profileOrders: profileOrdersReducer
});

const loadConstructorState = () => {
  try {
    const saved = localStorage.getItem('constructorState');
    if (!saved) return undefined;
    const parsed = JSON.parse(saved);
    if (parsed && typeof parsed === 'object' && 'ingredients' in parsed) {
      return {
        bun: parsed.bun ?? null,
        ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients : []
      };
    }
  } catch {
    localStorage.removeItem('constructorState');
  }
  return undefined;
};

const savedConstructor = loadConstructorState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: savedConstructor
    ? { burgerConstructor: savedConstructor }
    : undefined,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    'constructorState',
    JSON.stringify(state.burgerConstructor)
  );
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const ingredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;
export const ingredientsLoadingSelector = (state: RootState) =>
  state.ingredients.isLoading;
export const ingredientsErrorSelector = (state: RootState) =>
  state.ingredients.error;

export const isAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
export const userDataSelector = (state: RootState) => state.user.user;
export const userLoadingSelector = (state: RootState) => state.user.isLoading;

export const orderSelector = (state: RootState) => state.order.order;
export const orderLoadingSelector = (state: RootState) => state.order.isLoading;
export const orderModalDataSelector = (state: RootState) =>
  state.order.orderModalData;

export const feedOrdersSelector = (state: RootState) => state.feed.orders;
export const feedTotalSelector = (state: RootState) => state.feed.total;
export const feedTotalTodaySelector = (state: RootState) =>
  state.feed.totalToday;
export const feedLoadingSelector = (state: RootState) => state.feed.isLoading;

export const constructorBunSelector = (state: RootState) =>
  state.burgerConstructor.bun;
export const constructorIngredientsSelector = (state: RootState) =>
  state.burgerConstructor.ingredients;

export const profileOrdersSelector = (state: RootState) =>
  state.profileOrders.orders;
export const profileOrdersLoadingSelector = (state: RootState) =>
  state.profileOrders.isLoading;

export default store;
