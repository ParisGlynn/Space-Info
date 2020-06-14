fetch('https://spacelaunchnow.me/api/3.3.0/launch/upcoming/')

  .then(res => res.json())
  .then(data => console.log(data));