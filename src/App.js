import React, { useState, useEffect } from "react";

const perguntas = [
  { pergunta: "1. Qual seu gênero?", opcoes: ["Masculino", "Feminino", "Outros"] },
  { pergunta: "2. Qual é o seu humor hoje?", opcoes: ["Triste", "Calmo", "Motivado", "Disposto", "Animado"] },
  { pergunta: "3. Vai praticar algum esporte hoje?", opcoes: ["Sim, algo intenso", " Sim, algo mais tranquilo", "Não, hoje vou descansar", "Não sei, talvez mais tarde"] },
  { pergunta: "4. Você se preocupa com sua saúde?", opcoes: ["Muito, sempre busco opções saudáveis", "Sim, mas de vez em quando abro uma exceção", "Não muito, gosto de aproveitar sem pensar nisso", "Tento, mas é difícil manter a disciplina"] },
  { pergunta: "5. Você costuma estudar com que frequência?", opcoes: ["Diariamente", "Algumas vezes por semana", "Raramente", "Só quando preciso"] },
  { pergunta: "6. Qual roupa você está usando agora?", opcoes: ["Uma roupa leve (shorts e camiseta)", "Conjunto casual  (camisa, calça, casaco)", "Roupa preparada para a chuva", "Roupas para o frio", "Roupas de esporte/academia"] },
];

const PRIMARY = "#cc0000";
const PRIMARY_DARK = "#a00000";
const TEXT_COLOR = "#111";
const BACKGROUND_OPACITY = "rgba(255, 255, 255, 0.98)";

const respostaFinal = (
  <p style={{ fontSize: "clamp(1.1rem, 4vw, 1.3rem)", fontWeight: "600", color: "#333" }}>
    <img src='' alt='foto do redbull zero'></img>
    <div style={{ color: PRIMARY, fontWeight: "900", fontSize: "clamp(1.8rem, 5.5vw, 2.2rem)" }}>
      RED BULL ZERO
    </div>
    <div>
      ZERO AÇÚCARES, <strong>100% AAASAS</strong>
    </div>
  </p>
);

export default function RedBullQuiz() {
  const [step, setStep] = useState("inicio");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [fadeInResultado, setFadeInResultado] = useState(false);

  const isMobile = windowWidth <= 430;

  const [showLoading, setShowLoading] = useState(false);
  const [fadeOutLoading, setFadeOutLoading] = useState(false);

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
      setStep("loading");
      setShowLoading(true);
      setFadeOutLoading(false); // garantir que fadeOut seja false ao iniciar loading
      setTimeout(() => {
        setFadeOutLoading(true); // inicia fade out
        setTimeout(() => {
          setShowLoading(false);
          setStep("resultado");
        }, 800); // espera 0.8s para tirar loading da tela e mostrar resultado
      }, 2500); // loading fica 2.5s visível antes de começar o fade out
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (step === "resultado") {
      setFadeInResultado(false);
      const timeout = setTimeout(() => setFadeInResultado(true), 50);
      return () => clearTimeout(timeout);
    } else {
      setFadeInResultado(false);
    }
  }, [step]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/backgrounds/redbull_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "1rem" : "1.5rem",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: BACKGROUND_OPACITY,
          borderRadius: isMobile ? "1rem" : "1.5rem",
          padding: isMobile ? "1.5rem" : "2rem",
          boxShadow: `0 0.5rem 2rem ${PRIMARY}40`,
          maxWidth: isMobile ? "90vw" : "35rem",
          width: "100%",
          textAlign: "center",
          fontSize: "clamp(0.9rem, 3vw, 1rem)",
          userSelect: "none",
          boxSizing: "border-box",
        }}
      >
        {step === "inicio" && (
          <>
            <h1
              style={{
                fontSize: isMobile ? "clamp(1.5rem, 5vw, 1.8rem)" : "2rem",
                fontWeight: "700",
                margin: "0.5rem 0",
              }}
            >
              Qual RedBull
            </h1>
            <img
              src="src/redbullcom-logo_double-with-text.svg"
              alt="Latas"
              style={{
                width: isMobile ? "85%" : "80%",
                maxWidth: isMobile ? "16rem" : "20rem",
                margin: "0.5rem auto 1rem",
                display: "block",
              }}
            />
            <h2
              style={{
                fontSize: isMobile ? "clamp(1.2rem, 4vw, 1.4rem)" : "1.5rem",
                color: TEXT_COLOR,
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              combina contigo hoje?
            </h2>
            <button
              onClick={iniciar}
              style={{
                marginTop: "1rem",
                backgroundColor: PRIMARY,
                color: "#fff",
                padding: isMobile ? "0.7rem 1.5rem" : "0.8rem 2rem",
                fontSize: isMobile ? "clamp(1rem, 3.5vw, 1.1rem)" : "1.2rem",
                border: "none",
                borderRadius: "0.75rem",
                cursor: "pointer",
                fontWeight: "700",
                boxShadow: `0 0 1rem ${PRIMARY}80`,
                transition: "background-color 0.3s ease",
                width: "100%",
                maxWidth: "20rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
              type="button"
            >
              Iniciar
            </button>
          </>
        )}

        {step === "quiz" && (
          <>
            <h2
              style={{
                fontSize: isMobile ? "clamp(1.2rem, 4vw, 1.4rem)" : "1.5rem",
                color: "#333",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {perguntas[indice].pergunta}
            </h2>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
              {perguntas[indice].opcoes.map((opcao, i) => (
                <li key={i} style={{ margin: isMobile ? "0.5rem 0" : "0.75rem 0" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: respostas[indice] === i ? PRIMARY : TEXT_COLOR,
                      boxShadow: respostas[indice] === i ? `0 0 8px ${PRIMARY}` : "none",
                      padding: isMobile ? "0.7rem 1rem" : "0.9rem 1.2rem",
                      borderRadius: "0.75rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      fontSize: isMobile ? "clamp(0.9rem, 3vw, 1rem)" : "1.2rem",
                      userSelect: "none",
                      transition: "all 0.3s ease",
                      width: "100%",
                    }}
                  >
                    <input
                      type="radio"
                      checked={respostas[indice] === i}
                      onChange={() => selecionarOpcao(i)}
                      style={{
                        marginRight: isMobile ? "0.8rem" : "1rem",
                        width: isMobile ? "1rem" : "1.1rem",
                        height: isMobile ? "1rem" : "1.1rem",
                      }}
                    />
                    {opcao}
                  </label>
                </li>
              ))}
            </ul>

            <button
              onClick={avancar}
              style={{
                marginTop: "1rem",
                padding: isMobile ? "0.7rem 1.5rem" : "0.9rem 2rem",
                fontSize: isMobile ? "clamp(0.9rem, 3vw, 1rem)" : "1.1rem",
                backgroundColor: PRIMARY,
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: `0 0 0.3rem ${PRIMARY}`,
                transition: "background-color 0.3s ease",
                width: "100%",
                maxWidth: "20rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
              type="button"
            >
              Avançar
            </button>
          </>
        )}

        {showLoading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
              opacity: fadeOutLoading ? 0 : 1,
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "clamp(1.2rem, 5vw, 2rem)" : "1.6rem",
                color: PRIMARY,
                fontWeight: "800",
                marginBottom: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "4px",
                textAlign: "center",
              }}
            >
              <span>Estamos vendo o melhor Red Bull para você</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </h2>
          </div>
        )}

        {step === "resultado" && (
          <div
            style={{
              opacity: fadeInResultado ? 1 : 0,
              transition: "opacity 0.2s ease-in-out",
              color: PRIMARY,
              fontWeight: "800",
              fontSize: isMobile ? "clamp(1.2rem, 5vw, 2rem)" : "1.6rem",
              marginBottom: "0.5rem",
              textAlign: "center",
              userSelect: "none",
              marginTop: 0,
            }}
          >
            <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Resultado</h1>
            {respostaFinal}
          </div>
        )}
      </div>

      {/* Responsividade extra */}
      <style>
        {`
          @media (max-width: 430px) {
            body {
              margin: 0;
              padding: 0;
            }
            button:hover {
              background-color: ${PRIMARY} !important;
            }
          }

          .dot {
            animation: jump 1.5s infinite;
            display: inline-block;
            font-size: 2rem;
            margin: 0 1px;
          }

          .dot:nth-child(1) {
            animation-delay: 0s;
          }
          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }
          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes jump {
            0%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
}