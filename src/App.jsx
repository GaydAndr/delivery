import { NavLink, Route, Routes } from 'react-router-dom';
import s from './App.module.scss';
import { Shops } from './pages/Shop/Shops';
import { MenuList } from './pages/Shop/components/MenuList/MenuList';
import { useDispatch, useSelector } from 'react-redux';
import { storeSelector } from './redux/stores/store-selectors';
import { ShoppingCard } from './pages/ShopingCart/ShoppingCard';
import { countPrice } from './redux/order/order-slice';
import { useEffect } from 'react';

function App() {
  const stores = useSelector(storeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countPrice());
  }, [dispatch]);

  return (
    <>
      <nav className={s.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.active : s.navLink)}
        >
          shop
        </NavLink>
        <NavLink
          to="/shopping-cart"
          className={({ isActive }) => (isActive ? s.active : s.navLink)}
        >
          shopping-cart
        </NavLink>
        {/* <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? s.active : s.navLink)}
        >
          history
        </NavLink> */}
      </nav>

      <Routes>
        <Route path="/" element={<Shops />}>
          {stores?.map((item, i) => {
            return (
              <Route
                key={i}
                path={`shop-${i}`}
                element={<MenuList menu={item.menu} />}
              />
            );
          })}
        </Route>

        <Route path="/shopping-cart" element={<ShoppingCard />} />
        <Route path="/history" element={<div>History</div>} />
      </Routes>
    </>
  );
}

export default App;
