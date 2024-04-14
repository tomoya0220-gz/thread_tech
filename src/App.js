import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

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
    <div>
      <header>掲示板</header>
      <div>
        <p>新着スレッド</p>
      </div>
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
  );
}