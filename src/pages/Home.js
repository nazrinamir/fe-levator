import React, { useState } from 'react';
import Button3D from '../components/Button3D';
import PageLayout from '../components/PageLayout';

function Home({ showToast }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      showToast("Please enter your name first!");
      return;
    }

    const greetings = [
      `Welcome aboard, ${name}! I'll be your elevator assistant today.`,
      `Hello ${name}! How may I assist you with your journey?`,
      `Great to meet you, ${name}! Feel free to explore our floors.`,
      `${name}, I'm at your service! Where would you like to go?`
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    showToast(randomGreeting);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <PageLayout
      floorNumber="FLOOR 1"
      title="You may introduce yourself"
      subtitle="Ground Floor - Main Lobby"
    >
      <div className="flex flex-col justify-center">
        <input 
          className="text-black font-darumadrop p-2 rounded-md m-6 text-xl text-center font-sans" 
          type="text" 
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button3D onClick={handleSubmit} className="mx-6">
          This is me
        </Button3D>
      </div>
    </PageLayout>
  );
}

export default Home; 