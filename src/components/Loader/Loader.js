import { Spin } from 'antd';
import { useSelector } from 'react-redux';

import classes from './Loader.module.css';

const Loader = () => {
  const isLoading = useSelector(({ appReducer }) => {
    return appReducer.loading;
  });

  return (
    <div className={classes.container}>
      <Spin spinning={isLoading} size="large" />
    </div>
  );
};

export default Loader;
