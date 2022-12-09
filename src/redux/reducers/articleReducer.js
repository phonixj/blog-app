import { ARTICLES_LOAD, CHANGE_PAGE, GET_ARTICLE_BY_ID } from '../actionsTypes';

const initialState = {
  articleList: [],
  count: 0,
  page: 1,
  article: null,
  articleId: null,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_LOAD: {
      return { ...state, articleList: [...action.articles], count: action.count };
    }
    case CHANGE_PAGE: {
      return { ...state, page: action.page };
    }
    case GET_ARTICLE_BY_ID: {
      return { ...state, article: action.article };
    }
    default:
      return state;
  }
};

export default articleReducer;
