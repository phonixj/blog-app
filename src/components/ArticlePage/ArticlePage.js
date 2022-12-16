import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import { getArticleById } from '../../redux/actions';
import ArticleItem from '../ArticleItem';
import Loader from '../Loader';

import classes from './ArticlePage.module.css';

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { article } = useSelector(({ articleReducer }) => {
    return articleReducer;
  });

  const isLoad = useSelector(({ appReducer }) => {
    return appReducer.loading;
  });

  const { slug } = useParams();
  useEffect(() => {
    dispatch(getArticleById(slug));
  }, [slug]);

  return isLoad ? (
    <Loader />
  ) : (
    <div className={classes['article-page']}>
      {article && (
        <>
          <ArticleItem article={article} />
          <div className={classes['article-body']}>
            <ReactMarkdown>{article.body}</ReactMarkdown>{' '}
          </div>
        </>
      )}
    </div>
  );
};

export default ArticlePage;
