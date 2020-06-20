// Get DOM elements

const spaceList = document.getElementById('space-list');
const upcoming = document.getElementById('upComing');
const previous = document.getElementById('previous');
const selectionHeading = document.getElementById('selection-heading');
const searchBtn = document.getElementById('searchBtn');
const searchWindow = document.getElementById('search-window');
const searchForm = document.getElementById('search-form');
const category = document.getElementById('category');
const term = document.getElementById('term');

// Get API data for Upcoming or Previous launches
function getData(launches) {
    selectionHeading.innerText = `${launches[0].toUpperCase() + launches.slice(1)} launches`;
    fetch(`https://spacelaunchnow.me/api/3.3.0/launch/${launches}/?limit=200`)
    .then(res => res.json())
    .then(data => addDataToDOM(data, launches)); 
}

// Add data for Upcoming or Previous launches to DOM
function addDataToDOM(data, launches) {
  spaceList.innerHTML = '';
  data.results.forEach(item => {
    const spaceItem = document.createElement('div');
    spaceItem.classList.add('item-box');
    spaceItem.innerHTML = `
      <span class = 'mission'>Mission: ${item.name}</span>
      <span class = 'net'>${launches === 'upcoming' ? 'NET: ' : ''} ${item.net}</span>`;
    spaceList.appendChild(spaceItem);
  });
}

// Show the search form
function openSearchForm() {
  spaceList.innerHTML = '';
  selectionHeading.innerText = '';
  searchWindow.classList.toggle('show');
}

// Get search category data from API
function downloadSearchData() {
  fetch(`https://spacelaunchnow.me/api/3.3.0/${category.value}/?search=${term.value}`)
    .then(res => res.json())
    .then(data => determineCategory(data));
}
// Find searched term in returned API data
function determineCategory(data) {
  if(category.value === 'astronaut') {
      if(data.results.length !== 0) {
        searchWindow.classList.remove('show');
        addAstronautToDOM(data);
      } else showNoResults();
  } else if(category.value === 'launch') {
    if(data.results.length !== 0) {
      searchWindow.classList.remove('show');
      addLaunchToDOM(data);
    } else showNoResults();
  } else if(category.value === 'expedition') {
    if(data.results.length !== 0) {
      searchWindow.classList.remove('show');
      addExpeditionToDOM(data);
    } else showNoResults();
  } else if(category.value === 'spacecraft') {
    if(data.results.length !== 0) {
      searchWindow.classList.remove('show');
      addSpacecraftToDOM(data);
    } else showNoResults();
  }
}


// Add Astronaut data to DOM
function addAstronautToDOM(data) {
  spaceList.innerHTML = '';
  data.results.forEach(astronaut => {
    const astronautEl = document.createElement('div');
    astronautEl.classList.add('item-box');
    astronautEl.innerHTML = `
      <img src = "${astronaut.profile_image_thumbnail}">
      <h3 class = 'astroName'>${astronaut.name}</h3>
      <p>${astronaut.nationality}</p>
      <p class = 'astroBorn'>Born: ${astronaut.date_of_birth}</p>
      <p class = 'astroDeath'>${astronaut.date_of_death !== null ? "Died: " + astronaut.date_of_death : ""}</p>
      <p class = 'astroBio'>${astronaut.bio}</p>
    `; 
    spaceList.appendChild(astronautEl);
  });
  term.value = '';
}

// Add Launch data to DOM
function addLaunchToDOM(data) {
  spaceList.innerHTML = '';
  data.results.forEach(launch => {
    const launchEl = document.createElement('div');
    launchEl.classList.add('item-box');
    launchEl.innerHTML = `
      <h3 class = 'astroName launchName'>${launch.name}</h3>
      <p>${launch.status.name}</p>
      <p class = 'astroBorn'>${launch.net}</p>
      <p class = 'astroDeath'>${launch.rocket.configuration.name}</p>
      <p class = 'astroBio'>${launch.pad.name}</p>
    `; 
    spaceList.appendChild(launchEl);
  });
  term.value = '';
}

// Add Spacecraft data to DOM
function addSpacecraftToDOM(data) {
  spaceList.innerHTML = '';
  data.results.forEach(spacecraft => {
    const spacecraftEl = document.createElement('div');
    spacecraftEl.classList.add('item-box');
    spacecraftEl.innerHTML = `
      <h3 class = 'astroName'>${spacecraft.name}</h3>
      <p>${spacecraft.description}</p>
      <p class = 'astroBorn'>Type: ${spacecraft.status.name}</p>
      <p class = 'astroDeath'>Agency: ${spacecraft.configuration.agency.name}</p>
    `; 
    spaceList.appendChild(spacecraftEl);
  });
  term.value = '';
}

// Add Expedition data to DOM
function addExpeditionToDOM(data) {
  spaceList.innerHTML = '';
  data.results.forEach(expedition => {
    const expeditionEl = document.createElement('div');
    expeditionEl.classList.add('item-box');
    expeditionEl.innerHTML = `
      <h3 class = 'astroName'>${expedition.name}</h3>
      <p class = 'astroBorn'>From: ${expedition.start}</p>
      <p class = 'astroDeath'>To: ${expedition.end}</p>
      <p>Spacestation: ${expedition.spacestation.name}</p>
    `; 
    spaceList.appendChild(expeditionEl);
  });
  term.value = '';
}

function showNoResults() {
  const noResultMsg = document.createElement('span');
  noResultMsg.classList.add('noResult');
  noResultMsg.innerText = `No Results Found For: ${term.value}`;
  searchWindow.appendChild(noResultMsg);

  setTimeout(() => searchWindow.removeChild(noResultMsg), 4000);
}
// Event Listeners
upcoming.addEventListener('click', () => getData(launches = 'upcoming'));
previous.addEventListener('click', () => getData(launches = 'previous'));
searchBtn.addEventListener('click', openSearchForm);
searchForm.addEventListener('submit', downloadSearchData);