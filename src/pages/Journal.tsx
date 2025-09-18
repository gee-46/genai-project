import React, { useState, useEffect, useRef } from 'react';

const Journal: React.FC = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [content, setContent] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    fetch(`/api/journals/${date}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.content || '');
      })
      .catch(() => setContent(''));
  }, [date]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      recognitionRef.current = null;
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      setContent(prev => prev + ' ' + transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const saveNote = () => {
    fetch('/api/journals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, content }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Note saved successfully!');
        } else {
          alert('Failed to save note.');
        }
      })
      .catch(() => alert('Failed to save note.'));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Journal</h1>
      <label className="block mb-2 font-semibold" htmlFor="date">Select Date:</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-xs"
      />
      <textarea
        className="w-full h-64 p-3 border rounded mb-4 resize-none"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your journal entry here..."
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded text-white ${listening ? 'bg-red-600' : 'bg-blue-600'}`}
          aria-label="Toggle voice input"
        >
          {listening ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button
          onClick={saveNote}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Journal;
