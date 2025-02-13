import React, { useState, useEffect } from "react";
import Button3D from "../components/Button3D";
import PageLayout from "../components/PageLayout";
import { assistant } from "../helper/assistant";

function Home({ showToast }) {
  const [name, setName] = useState("");
  const [hasSetName, setHasSetName] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    if (savedName) {
      setName(savedName);
      setHasSetName(true);
      assistant(savedName, showToast);
    }
  }, []);

  const handleSubmit = () => {
    assistant(name, showToast);
    setHasSetName(true);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (hasSetName) {
    return (
      <PageLayout
        floorNumber="FLOOR 1"
        title={`Welcome ${name}`}
        subtitle="Ground Floor - Main Lobby"
      >
        <div className="space-y-6">
          <p className="text-xl">You can now explore our building:</p>
          <div className="space-y-4  text-lg">
            <div className="text-left w-fit mx-auto">
              <p>🔒 Floor 5: Blog (Requires Purple Card)</p>
              <p>🔒 Floor 4: Contact (Requires Blue Card)</p>
              <p>🔒 Floor 3: Services (Requires Green Card)</p>
              <p>🏢 Floor 2: About Us</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4">
            Use the elevator navigation on the left to move between floors
          </p>
        </div>
      </PageLayout>
    );
  }

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
          onChange={e => setName(e.target.value)}
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
