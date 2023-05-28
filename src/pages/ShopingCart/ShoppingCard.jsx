import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderSelector } from '../../redux/order/order-selectors';

export const ShoppingCard = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const dishes = useSelector(orderSelector);
  const number = dishes.reduce((sum, { price }) => {
    return sum + +price;
  }, 0);
  const roundedNumber = Math.round(number * 100) / 100;
  setTotalPrice(roundedNumber);
  // setTotalPrice();
  // const dispatch = useDispatch();
  // const onChange = (event) => {
  //   switch (event.target.name) {
  //     case 'name':
  //       setName(event.target.value);
  //       break;
  //     case 'email':
  //       setEmail(event.target.value);
  //       break;
  //     case 'phone':
  //       setPhone(event.target.value);
  //       break;
  //     case 'address':
  //       setAddress(event.target.value);
  //       break;
  //     default:
  //       return;
  //   }
  // };
  // const handleRegister = (event) => {
  //   event.preventDefault();
  //   const credentials = {
  //     name,
  //     email,
  //     address,
  //     totalPrice,
  //     dishes,
  //   };
  //   // dispatch(postPatient(credentials))
  // };
  return (
    <>
      <div>{totalPrice}</div>
    </>
  );
};
