import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import uniqId from 'uniqid';

import ArticleItem from '../ArticleItem';
import { articlesLoad, changePage } from '../../redux/actions';
import Loader from '../Loader';
import Error from '../Error';

import classes from './ArticleList.module.css';

const ArticleList = () => {
  const { count, articleList, page } = useSelector(({ articleReducer }) => {
    return articleReducer;
  });
  const isLoad = useSelector(({ appReducer }) => {
    return appReducer.loading;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(articlesLoad(page));
  }, [page]);

  return (
    <>
      <Error />
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <div className={classes.articleList}>
            {articleList.map((article) => {
              const id = uniqId();
              return <ArticleItem key={id} article={article} />;
            })}
          </div>
          <Pagination
            current={page}
            total={count}
            onChange={(pages) => dispatch(changePage(pages))}
            defaultPageSize="5"
            showSizeChanger={false}
            className="ant-pagination-item-active"
          />
        </>
      )}
    </>
  );
};

export default ArticleList;
