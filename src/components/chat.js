import React, { useState, useRef, useEffect } from "react";
import "../pages/App.css";

export default function Chat({ themeColors }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! Envie uma notícia para eu analisar. 📄" },
  ]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "Analisador de Notícias";
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Adiciona mensagem no chat
    setMessages((msg) => [
      ...msg,
      { sender: "user", text: "📷 Enviou uma imagem..." },
    ]);

    // Envia para o backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(API_URL + "/img-to-txt", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const extracted = data.text || "(nenhum texto encontrado)";

      // Mostrar o texto extraído
      setMessages((msg) => [
        ...msg,
        { sender: "bot", text: "📝 Texto extraído da imagem:" },
        { sender: "bot", text: extracted },
      ]);

      // Auto-envio para análise, se quiser:
      const analysis = await fetch(API_URL + "/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extracted }),
      });

      const result = await analysis.json();

      setMessages((msg) => [
        ...msg,
        {
          sender: "bot",
          text: `${result.message} (${result.prediction})`,
        },
      ]);

    } catch (error) {
      setMessages((msg) => [
        ...msg,
        { sender: "bot", text: "⚠️ Erro ao processar imagem." },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch(API_URL + "/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        { sender: "bot", text: `${data.message} (${data.prediction})` },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Erro ao conectar com o servidor." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
        className="chat"
        style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: themeColors.background,
        }}
    >
        {/* Cabeçalho */}
        <header
        className="header"
        style={{
            borderBottomColor: themeColors.icon,
            flexShrink: 0, 
        }}
        >
        <h1 style={{ color: themeColors.text }}>Analisador de Notícias 📰</h1>
        </header>

        {/* Área de mensagens */}
        <div
        className="chat-area"
        ref={scrollViewRef}
        style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px 0",
            color: themeColors.text,
        }}
        >
        {messages.map((msg, i) => (
            <div
            key={i}
            className={`message-container ${
                msg.sender === "user" ? "user-align" : "bot-align"
            }`}
            >
            <div
                className="message-bubble"
                style={{
                backgroundColor:
                    msg.sender === "user"
                    ? themeColors.tint
                    : themeColors.background === "#121212"
                    ? "#2A2D2E"
                    : "#cdd1d3ff",
                color: msg.sender === "user" ? "#fff" : themeColors.text,
                }}
            >
                {msg.text}
            </div>
            </div>
        ))}
        </div>

        {/* Input fixo no rodapé */}
        <div
          className="input-container"
          style={{
            borderTop: `1px solid ${themeColors.icon}`,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            padding: "10px",
            backgroundColor:
              themeColors.background === "#121212" ? "#1E1E1E" : "#fafafa",
          }}
        >
          {/* Upload de imagem */}
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <label
            htmlFor="imageUpload"
            style={{
              backgroundColor: themeColors.tint,
              color: "#fff",
              padding: "8px",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            📷
          </label>

          {/* Textarea */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua notícia..."
            style={{
              flex: 1,
              backgroundColor:
                themeColors.background === "#121212" ? "#2A2D2E" : "#fff",
              color: themeColors.text,
              border: `1px solid ${themeColors.icon}`,
              borderRadius: "8px",
              padding: "8px",
              resize: "none",
            }}
            rows={2}
          />

          {/* Botão enviar */}
          <button
            style={{
              backgroundColor: themeColors.tint,
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              marginLeft: "8px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
            className="send-button"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>

    </div>
    );

}
