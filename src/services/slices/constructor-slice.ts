import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface TConstructorIngredient extends TIngredient {
  id: string;
}

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newIngredient: TConstructorIngredient = {
        ...action.payload,
        id: Date.now().toString()
      };
      if (newIngredient.type === 'bun') {
        state.bun = newIngredient;
      } else {
        state.ingredients.push(newIngredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [movedItem] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedItem);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    restoreConstructor: (
      state,
      action: PayloadAction<{
        bun: TConstructorIngredient | null;
        ingredients: TConstructorIngredient[];
      }>
    ) => {
      state.bun = action.payload.bun ?? null;
      state.ingredients = Array.isArray(action.payload.ingredients)
        ? action.payload.ingredients
        : [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  restoreConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
