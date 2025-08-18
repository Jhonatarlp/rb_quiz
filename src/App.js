import React, { useState, useEffect } from "react";

const perguntas = [
  { pergunta: "1. Qual seu gênero?", opcoes: ["Masculino", "Feminino", "Outros"] },
  { pergunta: "2. Qual é o seu humor hoje?", opcoes: ["Triste", "Calmo", "Motivado", "Disposto", "Animado"] },
  { pergunta: "3. Vai praticar algum esporte hoje?", opcoes: ["Sim, algo intenso", " Sim, algo mais tranquilo", "Não, hoje vou descansar", "Não sei, talvez mais tarde"] },
  { pergunta: "4. Você se preocupa com sua saúde?", opcoes: ["Muito, sempre busco opções saudáveis", "Sim, mas de vez em quando abro uma exceção", "Não muito, gosto de aproveitar sem pensar nisso", "Tento, mas é difícil manter a disciplina"] },
  { pergunta: "5. Você costuma estudar com que frequência?", opcoes: ["Diariamente", "Algumas vezes por semana", "Raramente", "Só quando preciso"] },
  { pergunta: "6. Qual roupa você está usando agora?", opcoes: ["Uma roupa leve (shorts e camiseta)", "Conjunto casual  (camisa, calça, casaco)", "Roupa preparada para a chuva", "Roupas para o frio", "Roupas de esporte/academia"] },
  { pergunta: "7. Em qual momento do seu dia você mais sente que precisa de energia extra?", opcoes: ["Durante a aula ou quando estudo à noite", "No intervalo ou depois do almoço (bate a preguiça)", "Antes ou depois do treino/academia", "Durante festas, rolês ou encontros com amigos", "No trabalho ou estágio"] },
];

const PRIMARY = "#cc0000";
const PRIMARY_DARK = "#a00000";
const TEXT_COLOR = "#111";

const respostaFinal = (
  <p style={{ fontSize: "clamp(1.1rem, 4vw, 1.3rem)", fontWeight: "600", color: "#333" }}>
    <img src='/backgrounds/redbull_zero_kv.png' alt='Red Bull Zero' style={{ maxWidth: "12rem", marginBottom: "1rem" }}></img>
    <div style={{ color: PRIMARY, fontWeight: "900", fontSize: "clamp(1.8rem, 5.5vw, 2.2rem)" }}>
      RED BULL ZERO
    </div>
    <div>
      ZERO AÇÚCARES, <strong>100% ENERGIA</strong>
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
      setFadeOutLoading(false);
      setTimeout(() => {
        setFadeOutLoading(true);
        setTimeout(() => {
          setShowLoading(false);
          setStep("resultado");
        }, 800);
      }, 2500);
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
        backgroundImage:
          step === "resultado"
            ? "url('/backgrounds/redbull_zero_kv.png')"
            : "url('/backgrounds/neutral_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "1rem" : "1.5rem",
        boxSizing: "border-box",
        overflowY: "auto",
        filter: step === "resultado" ? "none" : "contrast(0.8) brightness(0.9) saturate(0.8)",
        position: "relative",
      }}
    >
      {/* overlay neutro só antes do resultado */}
      {step !== "resultado" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(240,240,240,0.6)", // cor sólida com baixa opacidade
            zIndex: 0,
          }}
        ></div>
      )}

      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: isMobile ? "1rem" : "1.5rem",
          padding: isMobile ? "1.5rem" : "2rem",
          boxShadow: `0 0.5rem 2rem ${PRIMARY}40`,
          maxWidth: isMobile ? "90vw" : "38rem",
          width: "100%",
          textAlign: "center",
          fontSize: "clamp(0.9rem, 3vw, 1rem)",
          userSelect: "none",
          boxSizing: "border-box",
          zIndex: 1,
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "clamp(1.2rem, 4vw, 1.4rem)" : "1.5rem",
                color: "#333",
                fontWeight: "600",
                margin: 0,
                textAlign: "center",
              }}
            >
              {perguntas[indice].pergunta}
            </h2>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "0.8rem" : "1rem",
              }}
            >
              {perguntas[indice].opcoes.map((opcao, i) => (
                <li key={i}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: isMobile ? "0.8rem" : "1rem",
                      color: respostas[indice] === i ? PRIMARY : TEXT_COLOR,
                      boxShadow: respostas[indice] === i ? `0 0 8px ${PRIMARY}` : "none",
                      padding: isMobile ? "0.75rem 1rem" : "1rem 1.25rem",
                      borderRadius: "0.75rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: isMobile ? "clamp(0.9rem, 3vw, 1rem)" : "1.1rem",
                      backgroundColor: respostas[indice] === i ? "#f9f9f9" : "transparent",
                      userSelect: "none",
                      transition: "all 0.3s ease",
                      width: "90%",
                    }}
                  >
                    <input
                      type="radio"
                      checked={respostas[indice] === i}
                      onChange={() => selecionarOpcao(i)}
                      style={{
                        marginTop: "0.2rem",
                        width: isMobile ? "1rem" : "1.1rem",
                        height: isMobile ? "1rem" : "1.1rem",
                      }}
                    />
                    <span style={{ flex: 1, textAlign: "justify" }}>{opcao}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
              <button
                onClick={avancar}
                style={{
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
            </div>
          </div>
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

          .dot:nth-child(1) { animation-delay: 0s; }
          .dot:nth-child(2) { animation-delay: 0.2s; }
          .dot:nth-child(3) { animation-delay: 0.4s; }

          @keyframes jump {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
          }
        `}
      </style>  
    </div>
  );
}
