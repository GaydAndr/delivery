import { useState } from 'react';
import s from './CardList.module.scss';
import { useDispatch } from 'react-redux';
import {
  correctPrice,
  countPrice,
  deleteItem,
} from '../../../../redux/order/order-slice';

export const CardList = ({ dish_name, id, price, count, totalDishesList }) => {
  const [totalCount, setTotalCount] = useState(count);
  const dispatch = useDispatch();

  const newOrderItem = (num) => {
    const newOrderCount = {
      id,
      dish_name,
      price,
      count: Number(num),
    };
    totalDishesList(newOrderCount);
  };

  const onChange = (event) => {
    if (event.target.value < totalCount) {
      const minus = { price, act: '-' };

      dispatch(correctPrice(minus));
    } else {
      const plus = { price, act: '+' };
      dispatch(correctPrice(plus));
    }
    setTotalCount(event.target.value);
    newOrderItem(event.target.value);
  };

  const removeDish = (id) => {
    dispatch(deleteItem(id));
    dispatch(countPrice());
  };

  return (
    <>
      <ul>
        <li key={id} className={s.card}>
          <ul>
            <li className={s.title}>{dish_name}</li>
            <li className={s.count}>
              <input
                type="number"
                name="count"
                min="1"
                id={id}
                value={totalCount}
                onChange={onChange}
              />
            </li>
            <li className={s.priceAndBuy}>
              <div className={s.price}>
                {Math.round(price * totalCount * 100) / 100}₴
              </div>
              <button
                type="button"
                className={s.buy}
                onClick={() => removeDish(id)}
              >
                Remove from Card
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};
