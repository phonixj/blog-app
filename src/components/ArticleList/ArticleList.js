import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import uniqId from 'uniqid';
import { useNavigate, useParams } from 'react-router-dom';

import ArticleItem from '../ArticleItem';
import { articlesLoad } from '../../redux/actions';
import Loader from '../Loader';
import Error from '../Error';

import classes from './ArticleList.module.css';

const ArticleList = () => {
  const navigate = useNavigate();
  const { page = 1 } = useParams();
  const { count, articleList } = useSelector(({ articleReducer }) => {
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
            current={Number(page)}
            total={count}
            onChange={(pages) => {
              navigate(`/articles/page/${pages}`);
            }}
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
