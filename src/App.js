import React, { useState, useEffect } from "react";

const perguntas = [
  { 
    pergunta: "1. Qual seu gênero?", 
    opcoes: ["Masculino", "Feminino", "Prefiro não responder", "Outro"] 
  },
  { 
    pergunta: "2. Como você se sente hoje?", 
    opcoes: ["Cansado(a)", "Calmo(a)", "Motivado(a)", "Disposto(a)", "Animado(a)"] 
  },
  { 
    pergunta: "3. Qual momento do dia você mais sente que precisa de energia extra?", 
    opcoes: [
      "De manhã cedo, para começar as aulas",
      "No intervalo ou depois do almoço (quando bate a preguiça)",
      "Antes ou depois do treino/academia",
      "À noite, para estudar ou entregar trabalhos",
      "Durante festas, rolês ou encontros com amigos",
      "No estágio ou no trabalho"
    ] 
  },
  { 
    pergunta: "4. Em quais situações você mais consome algo para dar energia?", 
    opcoes: [
      "Antes das provas ou trabalhos importantes",
      "Durante os treinos",
      "Para aguentar a madrugada estudando",
      "Antes de sair para festas",
      "No dia a dia, para manter o ritmo"
    ] 
  },
  { 
    pergunta: "5. Com que frequência você pratica atividades físicas?", 
    opcoes: ["Diariamente", "Algumas vezes por semana", "Raramente", "Nunca"] 
  },
  { 
    pergunta: "6. Você diria que se preocupa em equilibrar energia e saúde?", 
    opcoes: [
      "Sim, sempre busco opções mais saudáveis",
      "Sim, mas às vezes abro exceções",
      "Nem tanto, priorizo o sabor e praticidade",
      "Depende muito da rotina do dia"
    ] 
  },
  { 
    pergunta: "7. Qual cenário mais combina com você agora?", 
    opcoes: [
      "Cheguei da aula e estou cansado(a)",
      "Vou treinar depois da faculdade",
      "Estou estudando para a próxima prova",
      "Me preparando para sair com os amigos",
      "Trabalhando/estagiando e preciso de foco"
    ] 
  },
];

const PRIMARY = "#d6001c"; 
const PRIMARY_DARK = "#a00014";
const TEXT_COLOR = "#1c1c1c";
const Bluee = "#000B8D" 

const respostaFinal = (
  <div style={{ textAlign: "center" }}>
    <h1 style={{ color: PRIMARY, fontWeight: "900", fontSize: "clamp(1.8rem, 5vw, 2.2rem)", marginBottom: "0.5rem" }}>
      REDBULL ZERO
    </h1>
    <p style={{ fontSize: "clamp(1.1rem, 4vw, 1.3rem)", fontWeight: "600", color: "#333", margin: 0 }}>
      ZERO AÇÚCARES, <strong>100% ENERGIA</strong>
    </p>
  </div>
);

export default function RedBullQuiz() {
  const [step, setStep] = useState("inicio");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [fadeInResultado, setFadeInResultado] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [fadeOutLoading, setFadeOutLoading] = useState(false);

  const isMobile = windowWidth <= 430;

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
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "1rem" : "2rem",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          padding: isMobile ? "1.2rem" : "2rem",
          boxShadow: "0 0.5rem 1.5rem rgba(0,0,0,0.1)",
          maxWidth: "40rem",
          width: "100%",
          textAlign: "center",
          fontSize: "clamp(1rem, 3vw, 2rem)",
          userSelect: "none",
        }}
      >
      {step === "inicio" && (
        <>
          <h1 style={{ fontSize: "4rem", fontWeight: "700", margin: "0.5rem 0" }}>
            Qual <span style={{ color: PRIMARY }}>RedBull</span>
          </h1>
          <h2 style={{ fontSize: "3rem", fontWeight: "600", margin: "0 0 1.5rem 0" }}>
            combina contigo <span style={{ color: Bluee }}>hoje?</span>
          </h2>
        <button
          onClick={iniciar}
          style={{
            ...btnStyle(isMobile),                
            padding: isMobile ? "1.2rem 2.4rem" : "1rem 1.75rem", 
            fontSize: isMobile ? "1rem" : "1.3rem"            
          }}
          type="button"
        >
          Iniciar
        </button>
        </>
      )}


        {step === "quiz" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
            <h2
              style={{
                fontSize: isMobile ? "1.1rem" : "1.4rem",
                color: "#333",
                fontWeight: "600",
                margin: 0,
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
                gap: "1rem",
              }}
            >
              {perguntas[indice].opcoes.map((opcao, i) => (
                <li key={i}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      color: respostas[indice] === i ? PRIMARY : TEXT_COLOR,
                      padding: "0.8rem 1rem",
                      borderRadius: "0.75rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      backgroundColor: respostas[indice] === i ? "#fff6f6" : "transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <input
                      type="radio"
                      checked={respostas[indice] === i}
                      onChange={() => selecionarOpcao(i)}
                      style={{ accentColor: PRIMARY }}
                    />
                    <span style={{ flex: 1, textAlign: "left" }}>{opcao}</span>
                  </label>
                </li>
              ))}
            </ul>

            <button onClick={avancar} style={btnStyle(isMobile)} type="button">
              Avançar
            </button>
          </div>
        )}

        {showLoading && (
          <div
            style={{
              opacity: fadeOutLoading ? 0 : 1,
              transition: "opacity 0.3s ease",
              marginTop: "2rem",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: PRIMARY }}>
              Estamos vendo o melhor RedBull para você
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
              transition: "opacity 0.3s ease",
              marginTop: "1rem",
            }}
          >
            {respostaFinal}
          </div>
        )}
      </div>

      <style>
        {`
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

function btnStyle(isMobile) {
  return {
    marginTop: "1rem",
    backgroundColor: PRIMARY,
    color: "#fff",
    padding: isMobile ? "0.7rem 1.2rem" : "0.9rem 1.8rem",
    fontSize: isMobile ? "1rem" : "1.1rem",
    border: "none",
    borderRadius: "0.75rem",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: `0 0.3rem 0.6rem ${PRIMARY}66`,
    transition: "background-color 0.3s ease",
  };
}
