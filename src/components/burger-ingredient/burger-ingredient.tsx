import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/constructor-slice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      console.log('Добавление ингредиента:', ingredient);
      if (ingredient && ingredient._id) {
        dispatch(addIngredient(ingredient));
      } else {
        console.error('Ингредиент не валидный:', ingredient);
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

export default BurgerIngredient;
