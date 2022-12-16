import { Alert } from 'antd';
import { useSelector } from 'react-redux';

import classes from './Error.module.css';

const Error = () => {
  const error = useSelector(({ appReducer }) => {
    return appReducer.error;
  });
  if (error) {
    return (
      <div className={classes['error-message']}>
        <Alert message={error} type="error" />
      </div>
    );
  }
  return null;
};

export default Error;
