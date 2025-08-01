import React, { useState, useEffect } from "react";

const perguntas = [
  { pergunta: "Qual seu gênero?", opcoes: ["Masculino", "Feminino", "Outros"] },
  { pergunta: "Qual é o seu humor hoje?", opcoes: ["Triste", "Calmo", "Motivado", "Disposto", "Animado"] },
  { pergunta: "Você está com frio?", opcoes: ["Sim", "Não", "Mais ou menos"] },
  { pergunta: "Qual cor você está usando?", opcoes: ["Azul", "Vermelho", "Preto", "Amarelo"] },
];

const PRIMARY = "#cc0000";
const PRIMARY_DARK = "#a00000";
const TEXT_COLOR = "#111";
const BACKGROUND_OPACITY = "rgba(255, 255, 255, 0.92)";

const respostaFinal = (
  <>
    <span style={{ color: PRIMARY, fontWeight: "900", fontSize: "2.5rem" }}>
      Red Bull 0
    </span>{" "}
    — <em style={{ fontSize: "1.3rem", color: "#333" }}>Para todos os Humores!</em>
  </>
);

export default function RedBullQuiz() {
  const [step, setStep] = useState("inicio");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Atualiza largura da janela para responsividade
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iniciar = () => {
    setStep("quiz");
    setIndice(0);
    setRespostas([]);
  };

  const selecionarOpcao = (i) => {
    const novaRespostas = [...respostas];
    novaRespostas[indice] = i;
    setRespostas(novaRespostas);
  };

  const avancar = () => {
    if (respostas[indice] === undefined) {
      alert("Escolha uma opção para continuar!");
      return;
    }
    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      setStep("resultado");
    }
  };

  // Ajustes baseados na largura da tela
  const isMobile = windowWidth < 600;

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/backgrounds/redbull_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "brightness(30%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? 15 : 20,
      }}
    >
      <div
        style={{
          backgroundColor: BACKGROUND_OPACITY,
          borderRadius: 20,
          padding: isMobile ? 20 : 40,
          boxShadow: `0 8px 40px ${PRIMARY}40`,
          maxWidth: 600,
          width: "90%",
          textAlign: "center",
          fontSize: isMobile ? "1rem" : "1.1rem",
          userSelect: "none",
        }}
      >
        {step === "inicio" && (
          <>
            <h1
              style={{
                fontSize: isMobile ? "1.6rem" : "2.2rem",
                fontWeight: "700",
                color: "#111",
              }}
            >
              Qual
            </h1>
            <img
              src="src/redbullcom-logo_double-with-text.svg"
              alt="Red Bull"
              style={{ width: isMobile ? 240 : 320, margin: "10px 0" }}
            />
            <h2
              style={{
                fontSize: isMobile ? "1.3rem" : "1.8rem",
                color: PRIMARY,
                fontWeight: "700",
              }}
            >
              combina contigo hoje?
            </h2>
            <button
              onClick={iniciar}
              style={{
                marginTop: 25,
                backgroundColor: PRIMARY,
                color: "#fff",
                padding: isMobile ? "12px 30px" : "14px 40px",
                fontSize: isMobile ? "1.1rem" : "1.4rem",
                border: "none",
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: "700",
                boxShadow: `0 0 20px ${PRIMARY}80`,
                transition: "0.3s",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Iniciar
            </button>
          </>
        )}

        {step === "quiz" && (
          <>
            <h2
              style={{
                fontSize: isMobile ? "1.4rem" : "1.8rem",
                color: PRIMARY,
                fontWeight: "700",
                marginBottom: 20,
              }}
            >
              {perguntas[indice].pergunta}
            </h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {perguntas[indice].opcoes.map((opcao, i) => (
                <li key={i} style={{ margin: isMobile ? "10px 0" : "12px 0" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: respostas[indice] === i ? PRIMARY : "#eee",
                      color: respostas[indice] === i ? "#fff" : TEXT_COLOR,
                      boxShadow: respostas[indice] === i ? `0 0 15px ${PRIMARY}` : "none",
                      padding: isMobile ? "10px 15px" : "12px 20px",
                      borderRadius: 10,
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      userSelect: "none",
                    }}
                  >
                    <input
                      type="radio"
                      checked={respostas[indice] === i}
                      onChange={() => selecionarOpcao(i)}
                      style={{ marginRight: 15, width: 18, height: 18 }}
                    />
                    {opcao}
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={avancar}
              style={{
                marginTop: 25,
                padding: isMobile ? "12px 30px" : "12px 35px",
                fontSize: isMobile ? "1.1rem" : "1.2rem",
                backgroundColor: PRIMARY,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: `0 0 15px ${PRIMARY}`,
                transition: "background-color 0.3s ease",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Avançar
            </button>
          </>
        )}

        {step === "resultado" && (
          <>
            <h1
              style={{
                color: PRIMARY,
                fontWeight: "900",
                fontSize: isMobile ? "2rem" : "2.5rem",
                marginBottom: 15,
              }}
            >
              Resultado
            </h1>
            <p
              style={{
                fontSize: isMobile ? "1.2rem" : "1.5rem",
                fontWeight: "700",
                color: "#333",
              }}
            >
              {respostaFinal}
            </p>
            <button
              onClick={() => setStep("inicio")}
              style={{
                marginTop: 25,
                padding: isMobile ? "12px 30px" : "12px 40px",
                fontSize: isMobile ? "1.1rem" : "1.2rem",
                backgroundColor: PRIMARY,
                border: "none",
                borderRadius: 10,
                color: "#fff",
                cursor: "pointer",
                fontWeight: "700",
                boxShadow: `0 0 15px ${PRIMARY}`,
                transition: "background-color 0.3s ease",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Reiniciar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
