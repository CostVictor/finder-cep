import { isValidCEP, setError, createButtonReset } from "./utils";
import "./styles/main.scss";

const form = document.getElementById("form-cep");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = form.querySelector("input");
  const cep = input.value.trim().replace("-", "");

  const containerForm = document.getElementById("container-form");
  const containerInfo = document.getElementById("container-info");
  const spanError = containerForm.querySelector("span");

  containerInfo.innerHTML = "<h2 class='loading'><></h2>";
  spanError.textContent = "";

  const { valid, message } = isValidCEP(cep);
  if (valid) {
    const xhr = new XMLHttpRequest();
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText);
            if (data.erro) {
              setError("CEP não encontrado.");
            } else {
              setTimeout(() => {
                containerInfo.innerHTML = `
                  <p><strong>Rua:</strong> ${data.logradouro}</p>
                  <p><strong>Bairro:</strong> ${data.bairro}</p>
                  <p><strong>Cidade:</strong> ${data.localidade}</p>
                  <p><strong>Estado:</strong> ${data.uf}</p>
                `;
                createButtonReset(containerInfo, spanError);
                input.value = "";
              }, 2 * 1000);
            }
          } catch (error) {
            setError(`Erro na requisição: ${error}`);
          }
        } else {
          setError(
            "Erro na requisição. Verifique a conexão ou tente novamente mais tarde."
          );
        }
      }
    };
    xhr.send();
  } else {
    setError(message);
  }
});
