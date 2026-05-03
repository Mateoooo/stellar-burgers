import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredients-slice';
import orderReducer from '../slices/order-slice';
import userReducer from '../slices/user-slice';
import feedReducer from '../slices/feed-slice';
import constructorReducer from '../slices/constructor-slice';
import profileOrdersReducer from '../slices/profile-orders-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer,
  profileOrders: profileOrdersReducer
});

describe('rootReducer', () => {
  it('должен инициализироваться с правильным начальным состоянием', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('profileOrders');
  });

  it('должен возвращать предыдущее состояние при неизвестном экшене', () => {
    const previousState = rootReducer(undefined, { type: '@@INIT' });
    const nextState = rootReducer(previousState, { type: 'UNKNOWN_ACTION' });
    expect(nextState).toEqual(previousState);
  });
});
