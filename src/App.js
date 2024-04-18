import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { NewThread } from './components/NewThread';

export const App = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads', {
          method: "GET"
      });
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error('読み込みに失敗しました', error);
      }
    };
    fetchList();
    }, []);

  return (
    <BrowserRouter>
      <Link to="/">掲示板</Link>
      <br />
      <Link to="/thread/new">新規スレッド作成</Link>
      <Routes>
        <Route exact path="/" element={
          <>
            <Header />
            <div>
              <p>新着スレッド</p>
              <ul>
                {lists.map((list) => (
                  <li key={list.id}>
                    <div>
                      <p>{list.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        } />
        <Route path="/thread/new" element={<NewThread />} />
      </Routes>
    </BrowserRouter>
  );
};