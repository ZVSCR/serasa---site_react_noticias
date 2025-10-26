import React, { useState } from "react";
import Tabs from "../components/Tabs";
import Chat from "../components/chat";
import About from "./About";

import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [darkMode, setDarkMode] = useState(false);

  const themeColors = darkMode
    ? { background: "#121212", text: "#ffffff", tint: "#055705ff", icon: "#9BA1A6" }
    : { background: "#ffffff", text: "#4c4f52ff", tint: "#0f7a1dff", icon: "#687076" };

  return (
    <div className="app" style={{ backgroundColor: themeColors.background }}>
      <Tabs 
        activeTab={activeTab} 
        onChange={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        themeColors={themeColors}
      />

      <div
        className="page-container"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 56px)",
        }}
      >
        {activeTab === "chat" && <Chat themeColors={themeColors} />}
        {activeTab === "about" && <About themeColors={themeColors} />}
      </div>
    </div>
  );
}