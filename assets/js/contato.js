const formContato = document.querySelector("#form");
const inputEmail = document.querySelector("#email");
const inputTelefone = document.querySelector("#telefone");

// Cria elemento de feedback visual logo abaixo do formulário
const feedbackEl = document.createElement("p");
feedbackEl.style.marginTop = "10px";
feedbackEl.style.fontSize = "0.9rem";
feedbackEl.style.fontWeight = "600";
feedbackEl.style.display = "none";
formContato?.parentElement.appendChild(feedbackEl);

function mostrarFeedback(mensagem, sucesso = true) {
  feedbackEl.textContent = mensagem;
  feedbackEl.style.color = sucesso ? "var(--verde-escuro)" : "var(--coral-destaque, #B8333A)";
  feedbackEl.style.display = "block";
}

// Máscara automática para WhatsApp: (XX) XXXXX-XXXX
inputTelefone?.addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "").slice(0, 11);

  if (valor.length > 6) {
    valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
  } else if (valor.length > 2) {
    valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
  } else if (valor.length > 0) {
    valor = `(${valor}`;
  }

  e.target.value = valor;
});

formContato?.addEventListener("submit", async (e) => {
  e.preventDefault();
  feedbackEl.style.display = "none";

  const botao = formContato.querySelector('button[type="submit"]');
  const email = inputEmail.value.trim();
  const telefoneFormatado = inputTelefone.value.trim();
  const telefoneNumeros = telefoneFormatado.replace(/\D/g, "");

  // Validação de e-mail e telefone (DDD + 8 ou 9 dígitos)
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    mostrarFeedback("Por favor, insira um endereço de e-mail válido.", false);
    inputEmail.focus();
    return;
  }

  if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
    mostrarFeedback("Informe um WhatsApp válido com DDD (ex: 75 99999-9999).", false);
    inputTelefone.focus();
    return;
  }

  const formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("telefone", telefoneFormatado);

  botao.disabled = true;
  const textoOriginal = botao.textContent;
  botao.textContent = "Enviando...";

  try {
    const resposta = await fetch(
      "https://script.google.com/macros/s/AKfycbybEdePOnhbX7Cd_raOJ69Eo-J6m3WGm9Ejc1kKGwmJbiYR_7TslzI1bMTrL_D8fVxlxA/exec",
      {
        method: "POST",
        body: formData
      }
    );

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const resultado = await resposta.json();
    mostrarFeedback(resultado.mensagem || "Inscrição realizada com sucesso!", resultado.sucesso);

    if (resultado.sucesso) {
      formContato.reset();
    }

  } catch (erro) {
    mostrarFeedback("Não foi possível concluir a inscrição agora. Tente novamente.", false);
    console.error(erro);

  } finally {
    botao.disabled = false;
    botao.textContent = textoOriginal;
  }
});