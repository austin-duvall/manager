import { useState } from 'react';

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  const postData = async (url, body) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json(); // Assuming the response contains error data
        throw new Error(`Failed to add data: ${error.message || 'Unknown error'}`);
      }

      const result = await response.json();
      setData(result);
      setError(null);
      setSuccess(true);
    } catch (error) {
      // Extract specific error details
      const errorMessage = error.message || 'Unknown error';
      const details = {
        url,
        body,
        status: error.status || 'N/A',
        statusText: error.statusText || 'N/A',
      };
      setError({ message: errorMessage, details });
    } finally {
      setLoading(false);
    }
  };


  return { loading, error, data, postData, success, setSuccess };
};
