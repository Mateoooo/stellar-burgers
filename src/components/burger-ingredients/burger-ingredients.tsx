import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import {
  ingredientsSelector,
  constructorBunSelector,
  constructorIngredientsSelector
} from '../../services/store';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(ingredientsSelector) || [];
  const bun = useSelector(constructorBunSelector);
  const constructorIngredients =
    useSelector(constructorIngredientsSelector) || [];

  const getCount = (ingredientId: string, ingredientType: string) => {
    try {
      if (ingredientType === 'bun') {
        return bun && bun._id === ingredientId ? 2 : 0;
      }
      if (!constructorIngredients || !Array.isArray(constructorIngredients)) {
        return 0;
      }
      return constructorIngredients.filter((item) => item?._id === ingredientId)
        .length;
    } catch (error) {
      console.error('Error in getCount:', error);
      return 0;
    }
  };

  const getFilteredIngredients = (type: string) => {
    if (!ingredients || !Array.isArray(ingredients)) {
      return [];
    }
    return ingredients
      .filter((item) => item?.type === type)
      .map((item) => ({
        ...item,
        count: getCount(item._id, item.type)
      }));
  };

  const buns = getFilteredIngredients('bun');
  const mains = getFilteredIngredients('main');
  const sauces = getFilteredIngredients('sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!ingredients.length) {
    return <Preloader />;
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
