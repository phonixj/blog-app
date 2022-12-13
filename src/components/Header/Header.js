import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { logoutUser } from '../../redux/actions';
import Button from '../Button';

import classes from './Header.module.css';

const Header = () => {
  const { isLogged, username, avatarImage } = useSelector(({ authReducer }) => {
    return authReducer;
  });
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
  };

  return (
    <>
      <header className={classes.header}>
        <Link to="/" className={classes.title}>
          Realworld Blog
        </Link>
        {isLogged ? (
          <div className={classes.profile}>
            <Button text="Create article" btnClass="create-article" />
            <Link to="/profile" className={classes.username}>
              {username}
            </Link>
            <Link to="/profile">
              <Avatar size={46} icon={<UserOutlined />} src={avatarImage} />
            </Link>
            <Button text="Log Out" btnClass="log-out" handleClick={handleLogout} />
          </div>
        ) : (
          <div className={classes.auth}>
            <Link to="sign-in">
              <Button text="Sign In" btnClass="sign-in" />
            </Link>
            <Link to="sign-up">
              <Button text="Sign Up" btnClass="sign-up" />
            </Link>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Header;
