import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Button } from 'antd';

import BlogApi from '../../services/blogApi';

import classes from './SignUp.module.css';

const SignUp = () => {
  const userApi = new BlogApi();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const res = await userApi.registerUser(data);
    if (res.user) {
      navigate('/sign-in');
    } else {
      if (res.errors.username) {
        setError('username', { message: 'Username is taken' });
      }
      if (res.errors.email) {
        setError('email', { message: 'Email is taken' });
      }
    }
  };

  return (
    <form className={classes.signup} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Create new account</div>
      <label>
        <div className={classes.label}>Username</div>
        <input
          placeholder="Username"
          className={classes.input}
          {...register('username', {
            required: 'Required.',
            minLength: { value: 3, message: 'Your Username needs to be at least 3 characters.' },
            maxLength: { value: 20, message: 'Your Username needs to be at max 20 characters.' },
          })}
        />
        {errors?.username && <div className={classes.error}>{errors?.username?.message}</div>}
      </label>

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
      <label>
        <div className={classes.label}>Repeat Password</div>
        <input
          type="password"
          placeholder="Password"
          className={classes.input}
          {...register('confirmPassword', {
            validate: (value) => {
              return value === watch('password') || 'Passwords must match';
            },
          })}
        />
        {errors.confirmPassword && <div className={classes.error}>{errors.confirmPassword.message}</div>}
      </label>
      <Controller
        control={control}
        name="agreement"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Checkbox onChange={onChange} checked={value}>
            I agree to the processing of my personal information
            {errors.agreement && <div className={classes.error}>Required.</div>}
          </Checkbox>
        )}
      />
      <Button type="primary" size="large" htmlType="submit">
        Create
      </Button>
      <span className={classes['bottom-text']}>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </span>
    </form>
  );
};

export default SignUp;
