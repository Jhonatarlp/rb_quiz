import React, { useState, useEffect } from "react";

const perguntas = [
  {
    pergunta: "Qual a capital do Brasil?",
    opcoes: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correta: 2,
  },
  {
    pergunta: "Qual a cor do céu em um dia claro?",
    opcoes: ["Verde", "Azul", "Vermelho", "Amarelo"],
    correta: 1,
  },
  {
    pergunta: "Quanto é 2 + 2?",
    opcoes: ["3", "4", "5", "22"],
    correta: 1,
  },
];

export default function Quiz() {
  const [step, setStep] = useState("inicio"); // inicio, quiz, resultado
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]);
  
  // Para capturar tecla Enter para avançar
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Enter") {
        if (step === "quiz") {
          avancar();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, indice, respostas]);

  function iniciar() {
    setStep("quiz");
    setIndice(0);
    setRespostas([]);
  }

  function selecionarOpcao(opcaoIndex) {
    const novaRespostas = [...respostas];
    novaRespostas[indice] = opcaoIndex;
    setRespostas(novaRespostas);
  }

  function avancar() {
    if (respostas[indice] === undefined) {
      alert("Escolha uma opção antes de continuar");
      return;
    }

    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      setStep("resultado");
    }
  }

  function calcularResultado() {
    let acertos = 0;
    respostas.forEach((resposta, i) => {
      if (resposta === perguntas[i].correta) acertos++;
    });
    return acertos;
  }

  // Layout simples centralizado e branco
  return (
    <div style={{
      height: "100vh",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      textAlign: "center"
    }}>
      {step === "inicio" && (
        <>
          <h1>Quiz Legal</h1>
          <button onClick={iniciar} style={{ fontSize: "20px", padding: "10px 20px", cursor: "pointer" }}>
            Iniciar
          </button>
        </>
      )}

      {step === "quiz" && (
        <>
          <h2>{perguntas[indice].pergunta}</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {perguntas[indice].opcoes.map((opcao, i) => (
              <li key={i} style={{ margin: "10px 0" }}>
                <label style={{ cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="opcao"
                    checked={respostas[indice] === i}
                    onChange={() => selecionarOpcao(i)}
                  />{" "}
                  {opcao}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={avancar} style={{ fontSize: "16px", padding: "8px 16px", cursor: "pointer" }}>
            Avançar
          </button>
          <p style={{ marginTop: "20px", color: "#666" }}>Pressione Enter para avançar também.</p>
        </>
      )}

      {step === "resultado" && (
        <>
          <h1>Resultado</h1>
          <p>
            Você acertou {calcularResultado()} de {perguntas.length} perguntas.
          </p>
          <button onClick={() => setStep("inicio")} style={{ fontSize: "18px", padding: "10px 20px" }}>
            Reiniciar
          </button>
        </>
      )}
    </div>
  );
}
