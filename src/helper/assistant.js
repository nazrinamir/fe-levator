import React, { useState } from "react";

export const assistant = (name, showToast) => {
  if (!name.trim()) {
    showToast("Please enter your name first!");
    return;
  }

  // Store name in localStorage
  localStorage.setItem("name", name);

  const greetings = [
    `Welcome aboard, ${name}! I'll be your elevator assistant today.`,
    `Hello ${name}! How may I assist you with your journey?`,
    `Great to meet you, ${name}! Feel free to explore our floors.`,
    `${name}, I'm at your service! Where would you like to go?`
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  showToast(randomGreeting);
};
