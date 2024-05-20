import { Route, Routes } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
    </Routes>
  );
}

export default App;
