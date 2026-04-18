import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect, useState } from 'react';
import { Preloader } from '@ui';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrdersApi()
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки заказов:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
