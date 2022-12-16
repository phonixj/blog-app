import { Avatar, Tag, Button, Modal } from 'antd';
import { ExclamationCircleFilled, HeartFilled } from '@ant-design/icons';
import { format } from 'date-fns';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import BlogApi from '../../services/blogApi';
import { loaderOff, loaderOn, toggleLikeArticle } from '../../redux/actions';

import classes from './ArticleItem.module.css';

const ArticleItem = ({ article }) => {
  const blogApi = new BlogApi();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const { title, description, tagList, createdAt, author, favoritesCount, slug, favorited } = article;
  const { pathname } = useLocation();
  const { isLogged, username } = useSelector(({ authReducer }) => {
    return authReducer;
  });
  const disableButton = !(author.username === username);

  const heartColor = favorited ? { color: 'red' } : { color: 'black' };

  let articlePage = false;

  const articleClasses = [classes.article];
  const descriptionClasses = [classes.description];

  if (pathname.includes(`/articles/${slug}`)) {
    articleClasses.push(classes['article-full-size']);
    descriptionClasses.push(classes['description-full-size']);
    articlePage = true;
  }
  const dispatch = useDispatch();
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(loaderOn());
        blogApi
          .deleteArticle(slug)
          .then((res) => {
            dispatch(loaderOff());
            if (res === 'Error') {
              throw new Error('This is not your article.');
            }
            return navigate('/articles');
          })
          .catch((e) => {
            alert(e.message);
          });
      },
      onCancel() {},
    });
  };
  const toggleLike = () => {
    if (isLogged) {
      dispatch(toggleLikeArticle(slug, favorited));
    }
  };
  return (
    <div className={articleClasses.join(' ')}>
      <header className={classes.header}>
        <div className={classes['header-left']}>
          <Link to={`/articles/${slug}`} className={classes.title}>
            {title}
          </Link>
          <div className={classes.likes}>
            <HeartFilled style={heartColor} onClick={toggleLike} />
            {favoritesCount}
          </div>
          {tagList.length > 0 && (
            <ul className={classes.tagList}>
              {tagList.map((tag) => {
                if (tag.length) {
                  return <Tag key={uniqid()}>{tag}</Tag>;
                }
                return null;
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
      {isLogged && articlePage && (
        <div className={classes['btn-block']}>
          <Button disabled={disableButton} danger className={classes.btn} onClick={showDeleteConfirm}>
            Delete
          </Button>
          {disableButton ? (
            <Link to={`/articles/${slug}/edit`} onClick={(e) => e.preventDefault()}>
              <Button disabled className={classes['btn-edit']}>
                Edit
              </Button>
            </Link>
          ) : (
            <Link to={`/articles/${slug}/edit`}>
              <Button className={classes['btn-edit']}>Edit</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleItem;
