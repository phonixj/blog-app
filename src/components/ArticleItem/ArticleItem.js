import { Avatar, Tag } from 'antd';
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import uniqid from 'uniqid';

import classes from './ArticleItem.module.css';

const ArticleItem = ({ article }) => {
  const { title, description, tagList, createdAt, author, favoritesCount, slug } = article;
  const { pathname } = useLocation();

  const articleClasses = [classes.article];
  const descriptionClasses = [classes.description];

  if (pathname.includes(`/articles/${slug}`)) {
    articleClasses.push(classes['article-full-size']);
    descriptionClasses.push(classes['description-full-size']);
  }
  return (
    <div className={articleClasses.join(' ')}>
      <header className={classes.header}>
        <div className={classes['header-left']}>
          <Link to={`/articles/${slug}`} className={classes.title}>
            {title}
          </Link>
          <div className={classes.likes}>{favoritesCount}</div>
          {tagList.length > 0 && (
            <ul className={classes.tagList}>
              {tagList.map((tag) => {
                return <Tag key={uniqid()}>{tag}</Tag>;
              })}
            </ul>
          )}
        </div>
        <div className={classes['header-right']}>
          <div className={classes.author}>
            <span className={classes.name}>{author.username}</span>
            <span className={classes.date}>{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
          </div>
          <Avatar size={46} src={author.image} />
        </div>
      </header>
      <div className={descriptionClasses.join(' ')}>{description}</div>
    </div>
  );
};

export default ArticleItem;
