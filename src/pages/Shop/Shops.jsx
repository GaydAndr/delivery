import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import s from './Shops.module.scss';
import { useEffect } from 'react';
import { storeSelector } from '../../redux/stores/store-selectors';
import { getStores } from '../../redux/stores/stores-operation';
import { getoldOrder } from '../../redux/order/order-operation';
export const Shops = () => {
  const stores = useSelector(storeSelector);
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
            <li key={i}>
              <NavLink
                to={`shop-${i}`}
                className={({ isActive }) => (isActive ? s.active : s.shopLink)}
              >
                {item.shop}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className={s.menuList}>
        <Outlet />
      </div>
    </div>
  );
};
