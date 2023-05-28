import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  orderSelector,
  totalPriceSelector,
} from '../../redux/order/order-selectors';
import { CardList } from './components/CardList/CardList';
import s from './ShoppingCard.module.scss';
import { UserForm } from './components/UserForm/UserForm';
import { postOrder } from '../../redux/order/order-operation';

export const ShoppingCard = () => {
  const dispatch = useDispatch();
  const dishesList = useSelector(orderSelector);
  const totalPrice = useSelector(totalPriceSelector);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [newdishesList, setNewdishesList] = useState(dishesList);

  const totalDishesList = (item) => {
    const newList = dishesList.filter(({ id }) => id !== item.id);
    newList.push(item);
    setNewdishesList(newList);
  };

  const onChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'phone':
        setPhone(event.target.value);
        break;
      case 'address':
        setAddress(event.target.value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = {
      name,
      email,
      phone,
      address,
      totalPrice: Math.round(totalPrice * 100) / 100,
      dishes: newdishesList,
    };
    dispatch(postOrder(credentials));
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.UserForm}>
          <UserForm
            name={name}
            email={email}
            phone={phone}
            address={address}
            onChange={onChange}
          />
          <div className={s.totalPrice}>
            Total Price
            {Math.round(totalPrice * 100) / 100}₴
          </div>
          <button className={s.submit} type="submit">
            Create Order
          </button>
        </div>
        <div className={s.ListWrapper}>
          <ul className={s.menuList}>
            {dishesList?.map((item, i) => {
              return (
                <li className={s.menuItem} key={i}>
                  <CardList
                    dish_name={item.dish_name}
                    id={item.id}
                    price={item.price}
                    count={item.count}
                    totalDishesList={totalDishesList}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </>
  );
};
