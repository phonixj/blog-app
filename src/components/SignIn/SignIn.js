import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { loginUser } from '../../redux/actions';

import classes from './SignIn.module.css';

const SignIn = () => {
  const { loginErrorMessage, isLogged, token } = useSelector(({ authReducer }) => {
    return authReducer;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (loginErrorMessage) {
      setError('password', { message: 'email or password: is invalid' });
    }
    if (isLogged) {
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, [loginErrorMessage, isLogged]);

  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form className={classes.signin} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Sign In</div>
      <label>
        <div className={classes.label}>Email address</div>
        <input
          type="email"
          placeholder="Email address"
          className={classes.input}
          {...register('email', {
            required: 'Required.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address.',
            },
          })}
        />
        {errors.email && <div className={classes.error}>{errors.email?.message}</div>}
      </label>
      <label>
        <div className={classes.label}>Password</div>
        <input
          type="password"
          placeholder="Password"
          className={classes.input}
          {...register('password', {
            required: 'Required.',
            minLength: { value: 6, message: 'Your Password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Your Password needs to be at max 40 characters.' },
          })}
        />
        {errors.password && <div className={classes.error}>{errors.password?.message}</div>}
      </label>
      <Button type="primary" size="large" htmlType="submit">
        Login
      </Button>
      <span className={classes['bottom-text']}>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
      </span>
    </form>
  );
};

export default SignIn;
