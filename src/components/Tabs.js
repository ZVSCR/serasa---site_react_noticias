import React from "react";
import "./Tabs.css";

export default function Tabs({ activeTab, onChange, darkMode, setDarkMode, themeColors }) {
  const tabs = [
    { id: "chat", label: "Analisador" },
    { id: "about", label: "Sobre" },
  ];

  return (
    <div 
      className="tabs-container" 
      style={{
        backgroundColor: themeColors.background,
        borderBottom: `1px solid ${themeColors.icon}`,
      }}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
          style={{
            color: themeColors.text,
            borderBottomColor: activeTab === tab.id ? themeColors.tint : "transparent",
          }}
        >
          {tab.label}
        </button>
      ))}

      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        style={{
          backgroundColor: themeColors.tint,
          color: "#fff",
          marginLeft: "10px",
          borderRadius: "8px",
          padding: "6px 10px",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
