import { useState, useEffect } from 'react';

export const useFetchEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployees = async (url) => {
      setLoading(true);

      try {
        const response = await fetch ("http://localhost:3001/employees", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setEmployees(result);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

  }, [])

  return { employees, loading, error };
}