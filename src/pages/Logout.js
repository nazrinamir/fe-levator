import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Button3D from '../components/Button3D';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleBackToLobby = () => {
    onLogout();
    navigate('/');
  };

  return (
    <PageLayout
      floorNumber="GF"
      title="Goodbye!"
      subtitle="Ground Floor - Exit"
    >
      <div className="space-y-4">
        <p className="text-xl">Thank you for visiting!</p>
        <Button3D 
          onClick={handleBackToLobby}
        >
            Back to Lobby
        </Button3D>
      </div>
    </PageLayout>
  );
}

export default Logout;