import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import s from './Shops.module.scss';
import { useEffect } from 'react';
import { storeSelector } from '../../redux/stores/store-selectors';
import { getStores } from '../../redux/stores/stores-operation';
import { getoldOrder } from '../../redux/order/order-operation';
import { totalPriceSelector } from '../../redux/order/order-selectors';
export const Shops = () => {
  const stores = useSelector(storeSelector);
  const totalPrice = useSelector(totalPriceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStores());
    dispatch(getoldOrder());
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <ul className={s.shopList}>
        {stores?.map((item, i) => {
          return (
            <li key={i} className={s.linkWrapper}>
              <NavLink
                to={`shop-${i}`}
                className={({ isActive }) => (isActive ? s.active : s.shopLink)}
              >
                {item.shop}
              </NavLink>
            </li>
          );
        })}
        <li className={s.totalPrice}>Total price: {totalPrice}</li>
      </ul>
      <div className={s.menuList}>
        <Outlet />
      </div>
    </div>
  );
};
