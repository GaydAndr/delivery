import s from './UserForm.module.scss';

export const UserForm = ({ name, email, phone, address, onChange }) => {
  return (
    <div className={s.inputWrapper}>
      <input
        className={s.input}
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="name"
        required
      />
      <input
        className={s.input}
        type="tel"
        name="phone"
        value={phone}
        onChange={onChange}
        placeholder="phone"
        required
      />
      <input
        className={s.input}
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="email"
        required
      />
      <input
        className={s.input}
        type="address"
        name="address"
        value={address}
        onChange={onChange}
        placeholder="address"
        required
      />
    </div>
  );
};
