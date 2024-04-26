import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Message = () => {
  const [userMessages, setMessages] = useState([]);
  const [userPost, setPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { threadId } = useParams();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`, {
          method: "GET"
      });
        const data = await response.json();
        setMessages(data.posts);
      } catch(error) {
        console.error(`読み込みに失敗しました`, error);
      }
    };
    fetchMessage();
  }, [threadId]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: userPost })
      });
      const newPost = await response.json();
      setMessages([...userMessages, newPost]);
      alert(`新しい投稿がされました`)
      setPost('');
    } catch(error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p>投稿一覧</p>
      <ul>
        {userMessages.map((userMessage) => (
          <li key={userMessage.id}>
            <div>
              <p>{userMessage.post}</p>
            </div>
          </li>
        ))}
      </ul>
      <p>コメント</p>
        <input
          value={userPost}
          onChange={e => setPost(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>投稿</button>
    </>
  );
};