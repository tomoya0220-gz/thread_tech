import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { NewThread } from './components/NewThread';
import { Message } from './components/Message';

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
      <div className="header">
        <Link to="/">掲示板</Link>
        <Link to="/threads/new">新規スレッド作成</Link>
      </div>
      <Routes>
        <Route exact path="/" element={
          <>
            <div className="thread-list-container">
              <p className="thread-list-title">新着スレッド</p>
              <ul className="thread-list">
                {lists.map((list) => (
                  <li key={list.id} className="thread-item">
                    <div>
                      <p>{list.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        } />
        <Route path="/threads/new" element={<NewThread />} />
        <Route path="/thread/:threadId" element={< Message />} />
      </Routes>
    </BrowserRouter>
  );
};