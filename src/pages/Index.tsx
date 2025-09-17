import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { Home } from './Home';

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full" style={{ background: 'var(--gradient-primary)' }}></div>
          <p className="text-muted-foreground">Loading UniSwap...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <Home />;
};

export default Index;
