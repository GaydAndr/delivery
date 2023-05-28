import { useState } from 'react';
import s from './MenuCard.module.scss';

export const MenuCard = ({ description, dish_name, id, price, addToOrder }) => {
  const [count, setCount] = useState(1);

  const onChange = (event) => {
    setCount(event.target.value);
  };
  return (
    <>
      <ul className={s.card} id={id}>
        <li className={s.title}>{dish_name}</li>
        <li className={s.description}>
          <div>Description:</div>
          {description}
        </li>
        <li className={s.count}>
          <input
            type="number"
            name="count"
            min="1"
            id={id}
            value={count}
            onChange={onChange}
          />
        </li>
        <li className={s.priceAndBuy}>
          <div className={s.price}>{price}₴</div>
          <button
            type="button"
            className={s.buy}
            onClick={() => addToOrder(id, dish_name, price, count)}
          >
            Add to Cart
          </button>
        </li>
      </ul>
    </>
  );
};
