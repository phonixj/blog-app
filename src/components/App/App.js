import { Routes, Route } from 'react-router-dom';

import Header from '../Header';
import ArticleList from '../ArticleList';
import ArticlePage from '../ArticlePage';

import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<ArticleList />} />
        <Route path="/articles/" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
