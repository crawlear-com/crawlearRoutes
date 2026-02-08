import type { ItemsCardListProps } from './types/ItemCardList.types';
import { useTranslation } from 'react-i18next';

const ItemCardList = <T, >({ card, items }: ItemsCardListProps<T>) => {
  const { t } = useTranslation(["myRoutes"]);

  return (<div className="container text-right">
    { items.length > 0 ? items.map((item: T) => card(item)) : 
      <div className='text-right'>{ t("main.no routes") }</div>}
  </div>);
}

export default ItemCardList;