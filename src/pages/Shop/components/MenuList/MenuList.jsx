// import { useSelector } from 'react-redux';
import { MenuCard } from '../MenuCard/MenuCard';
import s from './MenuList.module.scss';
import { orderSelector } from './../../../../redux/order/order-selectors';
import {
  addToPreOrder,
  changeCount,
} from '../../../../redux/order/order-slice';
import { useDispatch, useSelector } from 'react-redux';

export const MenuList = ({ menu }) => {
  const preOrder = useSelector(orderSelector);
  const dispatch = useDispatch();
  const addToOrder = (id, dish_name, price, count) => {
    const orderItem = {
      id,
      dish_name,
      price,
      count,
    };
    const existingObject = preOrder.find(({ id }) => id === orderItem.id);
    if (existingObject) {
      const newCount = +existingObject.count + +orderItem.count;
      orderItem.count = newCount;

      dispatch(changeCount(orderItem));
      return;
    }
    console.log(1);

    return dispatch(addToPreOrder(orderItem));
  };
  return (
    <>
      <ul className={s.menuList}>
        {menu?.map((item, i) => {
          return (
            <li className={s.menuItem} key={i}>
              <MenuCard
                description={item.description}
                dish_name={item.dish_name}
                id={item.id}
                price={item.price}
                addToOrder={addToOrder}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};
