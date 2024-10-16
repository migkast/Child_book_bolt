import React, { useState } from 'react';
import axios from 'axios';
import StoryForm from './components/StoryForm';
import StoryBook from './components/StoryBook';

const API_URL = '/.netlify/functions';

function App() {
  const [story, setStory] = useState<{ text: string; images: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStory = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending request to:', `${API_URL}/generate-story`);
      console.log('Form data:', formData);
      const response = await axios.post(`${API_URL}/generate-story`, formData);
      console.log('Response:', response.data);
      setStory(response.data);
    } catch (error) {
      console.error('Error generating story:', error);
      if (axios.isAxiosError(error)) {
        setError(`Error: ${error.response?.status} - ${error.response?.data?.error || error.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">Bedtime Story Generator</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!story ? (
        <StoryForm onSubmit={generateStory} loading={loading} />
      ) : (
        <StoryBook story={story} onNewStory={() => setStory(null)} />
      )}
    </div>
  );
}

export default App;