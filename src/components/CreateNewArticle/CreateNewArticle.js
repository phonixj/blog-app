import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import BlogApi from '../../services/blogApi';

import classes from './CreateNewArticle.module.css';

const CreateNewArticle = () => {
  const { article } = useSelector(({ articleReducer }) => {
    return articleReducer;
  });

  const [title, setTitle] = useState('Create new article');
  const { slug } = useParams();

  const blogApi = new BlogApi();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: { tags: [{ name: '' }] },
  });

  useEffect(() => {
    if (slug) {
      setTitle('Edit article');
    } else {
      setTitle('Create new article');
    }
    if (article) {
      setValue('title', article.title);
      setValue('shortDescription', article.description);
      setValue('text', article.body);
    } else {
      setValue('title', '');
      setValue('shortDescription', '');
      setValue('text', '');
    }
  }, [slug, article]);

  const { fields, append, remove } = useFieldArray({ name: 'tags', control });

  const onSubmit = (data) => {
    if (slug) {
      blogApi.editArticle(data, slug);
    } else {
      blogApi.createArticle(data);
    }
    navigate('/articles');
  };

  return (
    <form className={classes['create-article']} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>{title}</div>
      <label>
        <div className={classes.label}>Title</div>
        <input
          placeholder="Title"
          className={classes.input}
          {...register('title', {
            required: 'Required.',
          })}
        />
        {errors?.title && <div className={classes.error}>{errors?.title?.message}</div>}
      </label>

      <label>
        <div className={classes.label}>Short description</div>
        <input
          placeholder="Title"
          className={classes.input}
          {...register('shortDescription', {
            required: 'Required.',
          })}
        />
        {errors.shortDescription && <div className={classes.error}>{errors.shortDescription?.message}</div>}
      </label>
      <label>
        <div className={classes.label}>Text</div>
        <textarea
          placeholder="Text"
          className={`${classes.input} ${classes['input--large']}`}
          {...register('text', {
            required: 'Required.',
          })}
        />
        {errors.text && <div className={classes.error}>{errors.text?.message}</div>}
      </label>
      <div className={classes.tags}>
        Text
        {fields.map((field, index) => {
          return (
            <div className={classes.tag} key={field.id}>
              <input
                className={`${classes.input} ${classes['input--small']}`}
                {...register(`tags.${index}.name`, { value: '' })}
              />
              <Button danger size="large" className={classes.btn} onClick={() => remove(index)}>
                Delete
              </Button>
              {index === fields.length - 1 && (
                <Button size="large" onClick={() => append()} className={classes['btn-add']}>
                  Add tag
                </Button>
              )}
            </div>
          );
        })}
        {fields.length === 0 && (
          <Button size="large" onClick={() => append()} className={classes['btn-add']}>
            Add tag
          </Button>
        )}
      </div>
      <Button type="primary" size="large" htmlType="submit" className={classes['btn-send']}>
        Send
      </Button>
    </form>
  );
};

export default CreateNewArticle;
