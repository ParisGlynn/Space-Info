const spaceList = document.getElementById('space-list');
const upcoming = document.getElementById('upComing');
const previous = document.getElementById('previous');

function getData(launches) {
  
    fetch(`https://spacelaunchnow.me/api/3.3.0/launch/${launches}/?limit=200`)
    .then(res => res.json())
    .then(data => addDataToDOM(data, launches)); 
}


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

// Event Listeners
upcoming.addEventListener('click', () => getData(launches = 'upcoming'));
previous.addEventListener('click', () => getData(launches = 'previous'));