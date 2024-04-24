import { useState } from "react";

export const NewThread = () => {
  const [threads, setThreads] = useState([]);
  const [userText, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: userText })
      });

      if (response.ok) {
        const data = await response.json();
        setThreads(prevThreads => [...prevThreads, data]);
        alert('新しいスレッドが作成されました')
        setText('');
      } else {
        const errorData = await response.json();
        alert(`エラーが発生しました： ${errorData.message || response.status}`);
      }
    } catch(error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <textarea 
            type="text"
            value={userText}
            onChange={e => setText(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '作成中' : '作成する'}
        </button>
      </form>
    </>
  );
};