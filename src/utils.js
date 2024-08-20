/**
 * Retorna uma booleana informando se o CEP é valid e uma mensagem relacionada.
 * @param {string} cep
 * @returns {object}
 */
export function isValidCEP(cep) {
  const listRepet = Array.from({ length: 10 }, (_, index) =>
    String(index).repeat(8)
  );

  if (!/^[0-9]{8}$/.test(cep)) {
    return {
      valid: false,
      message: "O CEP deve possuir 8 caracteres numéricos.",
    };
  }

  if (listRepet.includes(cep)) {
    return {
      valid: false,
      message: "O CEP não pode ser composto por números repetidos.",
    };
  }

  return { valid: true, message: "CEP válido." };
}

/**
 * Cria uma mensagem de erro e um botão de resete na tela.
 * @param {string} message
 */
export function setError(message) {
  const containerForm = document.getElementById("container-form");
  const containerInfo = document.getElementById("container-info");
  const spanError = containerForm.querySelector("span");
  spanError.textContent = message;
  createButtonReset(containerInfo, spanError);
}

/**
 * Gera um botão de resete na tela.
 * @param {HTMLElement} containerInfo
 */
export function createButtonReset(containerInfo, spanError) {
  const button = document.createElement("button");
  button.textContent = "Resetar";
  button.onclick = () => {
    containerInfo.innerHTML = "<h2><></h2>";
    spanError.textContent = "";
  };
  button.style.marginTop = "3rem";
  containerInfo.appendChild(button);
}
