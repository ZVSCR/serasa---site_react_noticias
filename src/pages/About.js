import React from "react";

import "./about.css";

export default function About({ themeColors }) {
  return (
    <div
      className="container"
      role="main"
      aria-labelledby="about-heading"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Cabeçalho */}
      <header
        className="header"
        style={{
          borderBottom: `1px solid ${themeColors.icon}`,
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 id="about-heading" style={{ color: themeColors.text }}>
          Sobre o Projeto
        </h1>
      </header>

      {/* Conteúdo */}
      <section
        className="simpleContent"
        aria-label="Conteúdo sobre o projeto"
        style={{ lineHeight: 1.6 }}
      >
        <h2 className="simpleTitle" style={{ color: themeColors.text }}>
          Analisador de Notícias
        </h2>

        <p className="simpleText" style={{ color: themeColors.text }}>
          Este aplicativo foi desenvolvido como parte de um projeto acadêmico voltado à detecção
          de fake news utilizando técnicas de aprendizado de máquina.
        </p>

        <p className="simpleText" style={{ color: themeColors.text }}>
          O objetivo principal é promover educação digital, pensamento crítico e combate à
          desinformação por meio da tecnologia.
        </p>

        <div
          className="simpleFooter"
          aria-hidden="false"
          style={{
            marginTop: "20px",
            borderTop: `1px solid ${themeColors.icon}`,
            paddingTop: "10px",
            textAlign: "center",
          }}
        >
          <span
            className="simpleFooterText"
            style={{
              color: themeColors.text,
              opacity: 0.8,
              fontSize: "14px",
            }}
          >
            Combatendo a desinformação com tecnologia
          </span>
        </div>
      </section>
    </div>
  );
}
