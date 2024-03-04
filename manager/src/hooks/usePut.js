import { useState } from 'react';

export const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateData = async (url, dataToUpdate) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (!response.ok) {
        const error = await response.json(); // Assuming the response contains error data
        throw new Error(`Failed to update data: ${response.statusText}`);
      }

      const updatedData = await response.json();
      setError(null);
      setSuccess(true);
      return updatedData;
    } catch (error) {
      // Extract specific error details
      const errorMessage = error.message || 'Unknown error';
      const details = {
        url,
        status: error.status || 'N/A',
        statusText: error.statusText || 'N/A',
      };
      setError({ message: errorMessage, details });

    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateData, success, setSuccess };
};
