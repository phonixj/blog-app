import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { editUser } from '../../redux/actions';

import classes from './EditProfile.module.css';

const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  const { usernameTaken, emailTaken, avatarImage } = useSelector(({ authReducer }) => {
    return authReducer;
  });

  const dispatch = useDispatch();

  const [avatarInput, setAvatarInput] = useState(avatarImage);

  const handleAvatarChange = (e) => {
    setAvatarInput(e.target.value);
  };

  useEffect(() => {
    if (usernameTaken) {
      setError('username', { message: 'Username is taken' });
    }
    if (emailTaken) {
      setError('email', { message: 'Email is taken' });
    }
  }, [usernameTaken, emailTaken]);

  const validateUrl = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  const onSubmit = (data) => {
    dispatch(editUser(data));
  };

  return (
    <form className={classes['edit-profile']} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Edit Profile</div>
      <label>
        <div className={classes.label}>Username</div>
        <input
          placeholder="Username"
          className={classes.input}
          {...register('username', {
            required: 'Username cannot be empty',
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
            required: 'Email cannot be empty',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address.',
            },
          })}
        />
        {errors?.email && <div className={classes.error}>{errors?.email?.message}</div>}
      </label>
      <label>
        <div className={classes.label}>New Password</div>
        <input
          type="password"
          placeholder="New password"
          className={classes.input}
          {...register('newPassword', {
            minLength: { value: 6, message: 'Your Password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Your Password needs to be at max 40 characters.' },
          })}
        />
        {errors?.newPassword && <div className={classes.error}>{errors?.newPassword?.message}</div>}
      </label>
      <label>
        <div className={classes.label}>Avatar image (url)</div>
        <input
          type="url"
          placeholder="Avatar image"
          className={classes.input}
          {...register('avatarUrl', {
            value: avatarInput,
            onChange: handleAvatarChange,
            pattern: {
              value: validateUrl,
              message: 'Invalid url',
            },
          })}
        />
        {errors?.avatar && <div className={classes.error}>{errors?.avatar?.message}</div>}
      </label>
      <Button type="primary" size="large" htmlType="submit">
        Save
      </Button>
    </form>
  );
};

export default EditProfile;
