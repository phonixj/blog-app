import {
  ADD_ARTICLE_DATA,
  ARTICLES_LOAD,
  CREATE_ARTICLE,
  GET_ARTICLE_BY_ID,
  LIKE_ARTICLE,
  UNLIKE_ARTICLE,
} from '../actionsTypes';

const initialState = {
  articleList: [],
  count: 0,
  article: null,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_LOAD: {
      return { ...state, articleList: [...action.articles], count: action.count };
    }
    case GET_ARTICLE_BY_ID: {
      return { ...state, article: action.article };
    }
    case CREATE_ARTICLE: {
      return { ...state, article: null };
    }
    case ADD_ARTICLE_DATA: {
      return { ...state };
    }
    case LIKE_ARTICLE: {
      const { articleList } = state;
      const { data } = action;
      const itemIndex = articleList.findIndex((article) => {
        return article.slug === data.article.slug;
      });
      const nextArticleList = [...articleList.slice(0, itemIndex), data.article, ...articleList.slice(itemIndex + 1)];
      return { ...state, articleList: nextArticleList };
    }
    case UNLIKE_ARTICLE: {
      const { articleList } = state;
      const { data } = action;
      const itemIndex = articleList.findIndex((article) => {
        return article.slug === data.article.slug;
      });
      const nextArticleList = [...articleList.slice(0, itemIndex), data.article, ...articleList.slice(itemIndex + 1)];
      return { ...state, articleList: nextArticleList };
    }
    default:
      return state;
  }
};

export default articleReducer;
