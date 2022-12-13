import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../Header';
import ArticleList from '../ArticleList';
import ArticlePage from '../ArticlePage';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import CreateNewArticle from '../CreateNewArticle';
import { authCheckState } from '../../redux/actions';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/new-article" element={<CreateNewArticle />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
