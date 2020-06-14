const spaceList = document.getElementById('space-list');

fetch('https://spacelaunchnow.me/api/3.3.0/launch/upcoming/?limit=200')

  .then(res => res.json())
  .then(data => addDataToDOM(data));

function addDataToDOM(data) {
  console.log(data);
  data.results.forEach(item => {
    console.log(item.name);
    const spaceItem = document.createElement('div');
    spaceItem.classList.add('item-box');
    spaceItem.innerHTML = `
      <span class = 'mission'>Mission: ${item.name}</span>
      <span class = 'net'>NET: ${item.net}</span>`;
    spaceList.appendChild(spaceItem);
  });
}