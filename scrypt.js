const apiBaseUrl = "https://viacep.com.br/ws/";

const loadingSpan = document.getElementById("loadingSpan");
const successSpan = document.getElementById("successSpan");
const errorSpan = document.getElementById("errorSpan");

const formSearch = document.getElementById("formSearch");
const inputCep = document.getElementById("inputCep");

const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const localidade = document.getElementById("localidade");
const estado = document.getElementById("estado");
const regiao = document.getElementById("regiao");
const ddd = document.getElementById("ddd");

const infoMap = document.getElementById("infoMap");
const map = document.getElementById("map");

// ---------------- Funções ----------------

const buildMapQuery = (data) => {
  const parts = [
    data.cep.replace("-", ""),
    data.logradouro,
    data.bairro,
    data.localidade,
    data.estado,
  ].filter(Boolean);

  return parts.join("+");
};

const addInfoCep = (data) => {
  ddd.textContent = data.ddd || "...";
  cep.textContent = data.cep || "...";
  logradouro.textContent = data.logradouro || "...";
  bairro.textContent = data.bairro || "...";
  localidade.textContent = data.localidade || "...";
  estado.textContent = data.estado || "...";
  regiao.textContent = data.regiao || "...";
};

const clearInfoCep = () => addInfoCep({});

// ---------------- Eventos ----------------

formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();

  loadingSpan.classList.remove("hidden");
  successSpan.classList.add("hidden");
  errorSpan.classList.add("hidden");

  const cepValue = inputCep.value;
  const url = `${apiBaseUrl}${cepValue}/json/`;

  const response = await fetch(url);
  const data = await response.json();

  if (response.ok && data.cep) {
    successSpan.classList.remove("hidden");
    loadingSpan.classList.add("hidden");
    infoMap.classList.remove("hidden");
    formSearch.classList.add("sticky");

    addInfoCep(data);

    const mapQuery = buildMapQuery(data);
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
      mapQuery,
    )}&output=embed`;

    map.innerHTML = `
      <iframe src="${mapSrc}" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;

    return;
  }

  clearInfoCep();
  errorSpan.classList.remove("hidden");
  loadingSpan.classList.add("hidden");
  infoMap.classList.add("hidden");
  formSearch.classList.remove("sticky");
});

btnLimpar.addEventListener("click", () => {
  loadingSpan.classList.add("hidden");
  successSpan.classList.add("hidden");
  errorSpan.classList.add("hidden");
  infoMap.classList.add("hidden");
  formSearch.classList.remove("sticky");

  clearInfoCep();
  inputCep.value = "";
});
