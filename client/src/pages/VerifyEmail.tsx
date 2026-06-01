import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ENV } from '../helpers/EnvUtils';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 1. Extract
    const token = searchParams.get('token');

    if (!token) {
      setMessage('No token found in the link.');
      setLoading(false);
      return;
    }

    // 2. Feed to the function
    const verify = async () => {
      try {
        const response = await fetch(`${ENV.API_URL}/api/users/verify-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }) // The "Feeding" part
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Email verified! You can now log in.');
        } else {
          setMessage(data.message || 'Verification failed.');
        }
      } catch (error) {
        setMessage('Server error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="p-10 text-center">
      {loading ? <p>Verifying...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;