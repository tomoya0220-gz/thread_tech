import { useState } from "react";

export const NewThread = () => {
  const [text, setText] = useState('');
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
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`エラー`)
      }

      alert('新しいスレッドが作成されました')
      setText('');
    } catch(error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1>新規スレッド作成</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <textarea 
            type="text"
            value={text}
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