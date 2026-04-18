import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  constructorBunSelector,
  constructorIngredientsSelector,
  orderLoadingSelector,
  orderModalDataSelector,
  userDataSelector
} from '../../services/store';
import { createOrder, clearOrder } from '../../services/slices/order-slice';
import { clearConstructor } from '../../services/slices/constructor-slice';
import { TConstructorIngredient } from '../../services/slices/constructor-slice';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(userDataSelector);
  const bun = useSelector(constructorBunSelector);
  const ingredients = (useSelector(constructorIngredientsSelector) ||
    []) as TConstructorIngredient[];
  const orderRequest = useSelector(orderLoadingSelector);
  const orderModalData = useSelector(orderModalDataSelector);

  const constructorItems = {
    bun: bun as TConstructorIngredient | null,
    ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id
    ];

    dispatch(createOrder(orderData))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((error) => {
        console.error('Ошибка создания заказа:', error);
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
