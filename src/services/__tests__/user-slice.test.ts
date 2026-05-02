import userReducer, {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  authChecked,
  setUser,
  clearUser
} from '../slices/user-slice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('user slice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null
  };

  it('authChecked', () => {
    const action = authChecked();
    const newState = userReducer(initialState, action);
    expect(newState.isAuthChecked).toBe(true);
  });

  it('setUser', () => {
    const action = setUser(mockUser);
    const newState = userReducer(initialState, action);
    expect(newState.user).toEqual(mockUser);
  });

  it('clearUser', () => {
    const filledState = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    };
    const action = clearUser();
    const newState = userReducer(filledState, action);
    expect(newState.user).toBeNull();
    expect(newState.isAuthChecked).toBe(false);
  });

  it('registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
  });

  it('registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Ошибка');
  });

  it('loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const newState = userReducer(initialState, action);
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
  });

  it('logoutUser.fulfilled', () => {
    const filledState = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    };
    const action = { type: logoutUser.fulfilled.type };
    const newState = userReducer(filledState, action);
    expect(newState.user).toBeNull();
  });

  it('getUser.fulfilled', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUser };
    const newState = userReducer(initialState, action);
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
  });

  it('updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'New Name' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const newState = userReducer(initialState, action);
    expect(newState.user).toEqual(updatedUser);
  });
});
