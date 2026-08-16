//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function episodeCode(episode) {
  const s = String(episode.season).padStart(2, "0");
  const e = String(episode.number).padStart(2, "0");
  return `S${s}E${e}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  episodeList.forEach((episode) => {
    const card = document.createElement("article");
    card.innerHTML = `
      <h2><a href="${episode.url}">${episodeCode(episode)} - ${episode.name}</a></h2>
      <img src="${episode.image.medium}" alt="${episode.name}">
      <p>${episode.summary}</p>
    `;
    rootElem.appendChild(card);
  });

  const credit = document.createElement("p");
  credit.innerHTML = `Data from <a href="https://www.tvmaze.com">TVMaze.com</a>`;
  rootElem.appendChild(credit);
}

window.onload = setup;

let allEpisodes = [];

function setup() {
  allEpisodes = getAllEpisodes();
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  rootElem.appendChild(createControls());
  rootElem.appendChild(createEpisodesContainer());

  renderEpisodes(allEpisodes);
  populateSelector(allEpisodes);

  const footer = document.createElement("footer");
  footer.innerHTML =
    'Data originally provided by <a href="https://www.tvmaze.com/" target="_blank" rel="noopener">TVMaze.com</a>';
  rootElem.appendChild(footer);
}

function createControls() {
  const controls = document.createElement("div");
  controls.id = "controls";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-input";
  searchInput.placeholder = "Search episodes by name or summary...";
  searchInput.addEventListener("input", handleSearch);

  const matchCount = document.createElement("p");
  matchCount.id = "match-count";

  const selector = document.createElement("select");
  selector.id = "episode-selector";
  selector.addEventListener("change", handleSelect);

  controls.appendChild(searchInput);
  controls.appendChild(matchCount);
  controls.appendChild(selector);

  return controls;
}

function createEpisodesContainer() {
  const container = document.createElement("div");
  container.id = "episodes-container";
  return container;
}

function handleSearch(event) {
  const term = event.target.value.trim().toLowerCase();
  const filtered = allEpisodes.filter((episode) => {
    const name = episode.name.toLowerCase();
    const summary = (episode.summary || "").toLowerCase();
    return name.includes(term) || summary.includes(term);
  });
  renderEpisodes(term === "" ? allEpisodes : filtered);
}

function handleSelect(event) {
  const id = event.target.value;
  if (!id) return;
  const target = document.getElementById(`episode-${id}`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderEpisodes(episodeList) {
  const container = document.getElementById("episodes-container");
  container.innerHTML = "";

  const matchCount = document.getElementById("match-count");
  matchCount.textContent = `${episodeList.length} episode(s) found`;

  episodeList.forEach((episode) => {
    container.appendChild(createEpisodeCard(episode));
  });
}

function populateSelector(episodeList) {
  const selector = document.getElementById("episode-selector");
  selector.innerHTML = '<option value="">Jump to episode...</option>';

  episodeList.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `${formatEpisodeCode(episode)} - ${episode.name}`;
    selector.appendChild(option);
  });
}

function createEpisodeCard(episode) {
  const card = document.createElement("div");
  card.className = "episode-card";
  card.id = `episode-${episode.id}`;

  const title = document.createElement("h2");
  title.textContent = `${episode.name} - ${formatEpisodeCode(episode)}`;
  card.appendChild(title);

  if (episode.image && episode.image.medium) {
    const img = document.createElement("img");
    img.src = episode.image.medium;
    img.alt = episode.name;
    card.appendChild(img);
  }

  const summary = document.createElement("div");
  summary.innerHTML = episode.summary || "";
  card.appendChild(summary);

  return card;
}

function formatEpisodeCode(episode) {
  const season = String(episode.season).padStart(2, "0");
  const number = String(episode.number).padStart(2, "0");
  return `S${season}E${number}`;
}

window.onload = setup;