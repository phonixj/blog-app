import { Outlet, Link } from 'react-router-dom';

import Button from '../Button';

import classes from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <Link to="/" className={classes.title}>
          Realworld Blog
        </Link>
        <div className={classes.auth}>
          <Button text="Sign In" btnClass="sign-in" />
          <Button text="Sign Up" btnClass="sign-up" />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
