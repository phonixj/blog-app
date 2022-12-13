import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import classes from './CreateNewArticle.module.css';

const CreateNewArticle = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  const { fileds } = useFieldArray({ name: 'tags', control });

  return (
    <form className={classes['create-article']}>
      <div className={classes.title}>Create new article</div>
      <label>
        <div className={classes.label}>Title</div>
        <input
          placeholder="Title"
          className={classes.input}
          {...register('title', {
            required: 'Required.',
          })}
        />
        {errors?.username && <div className={classes.error}>{errors?.username?.message}</div>}
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
        {errors.email && <div className={classes.error}>{errors.email?.message}</div>}
      </label>
      <label>
        <div className={classes.label}>Text</div>
        <textarea
          placeholder="Text"
          className={`${classes.input} ${classes['input--large']}`}
          {...register('Text', {
            required: 'Required.',
          })}
        />
        {errors.password && <div className={classes.error}>{errors.password?.message}</div>}
      </label>
      <Button type="primary" size="large" htmlType="submit">
        Create
      </Button>
    </form>
  );
};

export default CreateNewArticle;
