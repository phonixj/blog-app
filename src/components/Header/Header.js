import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { createArticle, logoutUser } from '../../redux/actions';
import Button from '../Button';

import classes from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const { isLogged, username, avatarImage } = useSelector(({ authReducer }) => {
    return authReducer;
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreateArticle = () => {
    dispatch(createArticle());
    navigate('/new-article');
  };

  return (
    <>
      <header className={classes.header}>
        <Link to="/" className={classes.title}>
          Realworld Blog
        </Link>
        {isLogged ? (
          <div className={classes.profile}>
            <Button text="Create article" btnClass="create-article" handleClick={handleCreateArticle} />
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
