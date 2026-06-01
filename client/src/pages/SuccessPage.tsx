import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ENV } from "../helpers/EnvUtils";



const SuccessPage = () => {
  const { token, updateUser } = useAuth();
  const [status, setStatus] = useState<'verifying' | 'success' | 'timeout'>('verifying');
  const navigate = useNavigate();
  
  // Use a ref to track the interval ID so we can clear it cleanly anywhere
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Track total polling attempts to prevent infinite loops (e.g., max 10 tries)
  const attemptsRef = useRef<number>(0);
  const MAX_ATTEMPTS = 10; 
  const POLL_INTERVAL_MS = 2500; // Check every 2.5 seconds

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        attemptsRef.current += 1;
        
        const response = await fetch(`${ENV.API_URL}/api/users/payment-success`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();

        // If the backend webhook has successfully updated MongoDB:
        if (data.subscription_status === 'active') {
            setStatus('success');
            updateUser({
              pull_currency: data.pull_currency,
              subscription_status: data.subscription_status,
              plan_tier: data.plan_tier
            })
            // Clear the loop immediately
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            
            // Wait 2 seconds so the user can see the success animation, then redirect
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }

      // Safety check: If we hit the max attempts and status still isn't active
      if (attemptsRef.current >= MAX_ATTEMPTS && status !== 'success') {
        setStatus('timeout');
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      }
    };

    // Run the first check instantly when the component mounts
    checkSubscriptionStatus();

    // Set up the interval loop to repeat the check
    pollIntervalRef.current = setInterval(checkSubscriptionStatus, POLL_INTERVAL_MS);

    // CLEANUP: If the user leaves the page early, kill the interval loop to avoid memory leaks
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <div style={{ padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        {status === 'verifying' && (
          <div>
            <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
            <h2>Confirming your payment...</h2>
            <p>We are activating your pro account features. Please don't close this window.</p>
          </div>
        )}

        {status === 'success' && (
          <div style={{ color: '#27ae60' }}>
            <h1 style={{ fontSize: '48px', margin: '0 0 10px' }}>🎉</h1>
            <h2>Payment Verified!</h2>
            <p>Welcome to Pro! Redirecting you to your dashboard now...</p>
          </div>
        )}

        {status === 'timeout' && (
          <div style={{ color: '#c0392b' }}>
            <h1 style={{ fontSize: '48px', margin: '0 0 10px' }}>⚠️</h1>
            <h2>Taking longer than expected...</h2>
            <p>Your payment went through safely, but your data is taking an extra moment to synchronize.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Go to Dashboard Manually
            </button>
          </div>
        )}
      </div>

      {/* Basic CSS inject for the loading spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default SuccessPage;