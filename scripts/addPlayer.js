document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('field') !== null) {
    document.getElementById('field').innerHTML = '';
    document.getElementById('field').innerHTML = localStorage.getItem('field');
  }
  if (localStorage.getItem('title') !== null) {
    document.getElementById('title').innerHTML = '';
    document.getElementById('title').innerHTML = localStorage.getItem('title');
  }
});

let saveFirstname;
let saveLastname;
let savePlayerImage;
let saveElement;

const modal = document.getElementById('modal');

class Player {
  constructor(firstname, lastname, playerImage) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.playerImage = playerImage;
  }
  getFirstname() {
    return this.firstname;
  }
  getLastname() {
    return this.lastname;
  }
  getPlayerImage() {
    return this.playerImage;
  }
  setFirstname(newFirstname) {
    this.firstname = newFirstname;
  }
  setLastname(newLastname) {
    this.lastname = newLastname;
  }
  setPlayerImage(newPlayerImage) {
    this.playerImage = newPlayerImage;
  }
}

class Feature {
  addPlayer(player) {
    const field = document.getElementById('field');
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="player-section">
            <div class="player-border"></div>
            <img class="player-image" src="${player.getPlayerImage()}" alt="Example image">
        </div>
        <div class="player-name">
            <p>${player.getFirstname()} <span>${player.getLastname()}</span></p>
        </div>
        <div class="options-section">
            <button class="delete-btn" name="delete">
            
            </button>
            <button class="edit-btn" name="edit">
            
            </button>
        </div>
        `;
    element.classList.add('player-card');
    element.classList.add('new-player');
    element.classList.add('draggable');
    field.appendChild(element);
    localStorage.setItem('field', document.getElementById('field').innerHTML);
  }
  deletePlayer(element) {
    if (element.name === 'delete') {
      element.parentElement.parentElement.remove();
      localStorage.setItem('field', document.getElementById('field').innerHTML);
    }
  }
  savePlayerInfo(element) {
    if (element.name === 'edit') {
      console.log(element.parentElement.parentElement);
      savePlayerImage = element.parentElement.parentElement.childNodes[1].childNodes[3].src;
      saveFirstname = element.parentElement.parentElement.childNodes[3].childNodes[1].childNodes[0];
      saveLastname = element.parentElement.parentElement.childNodes[3].childNodes[1].childNodes[1].childNodes[0];
      saveElement = element.parentElement.parentElement;
    }
  }
  showEditPlayerModal(element) {
    if (element.name === 'edit') {
      console.log(element.parentElement.parentElement);
      modal.classList.add('show');
    }
  }
}

// DOM Events
// 1 element (ID):
document.getElementById('btn-add-player').addEventListener('click', function (e) {
  const firstname = document.getElementById('firstname').value.trim().toUpperCase();
  const lastname = document.getElementById('lastname').value.trim().toUpperCase();
  const playerImage = document.getElementById('player-image').value.trim();

  const player = new Player(firstname, lastname, playerImage);

  new Feature().addPlayer(player);

  document.getElementById('firstname').value = '';
  document.getElementById('lastname').value = '';
  document.getElementById('player-image').value = '';
});

document.getElementById('btn-edit-player').addEventListener('click', function (e) {
  let firstname = document.getElementById('modal-firstname').value.trim().toUpperCase();
  let lastname = document.getElementById('modal-lastname').value.trim().toUpperCase();
  let playerImage = document.getElementById('modal-player-image').value.trim();

  if (firstname === '') {
    firstname = saveFirstname.wholeText;
  }
  if (lastname === '') {
    lastname = saveLastname.wholeText;
  }
  if (playerImage === '') {
    playerImage = savePlayerImage;
  }

  const player = new Player(firstname, lastname, playerImage);
  new Feature().addPlayer(player);

  saveElement.remove();
  modal.classList.remove('show');
  saveFirstname = '';
  saveLastname = '';
  savePlayerImage = '';
  saveElement = '';
  document.getElementById('modal-firstname').value = '';
  document.getElementById('modal-lastname').value = '';
  document.getElementById('modal-player-image').value = '';
  localStorage.setItem('field', document.getElementById('field').innerHTML);
});

// More than 1 element:
main.addEventListener('click', (e) => {
  new Feature().deletePlayer(e.target);
  new Feature().showEditPlayerModal(e.target);
  new Feature().savePlayerInfo(e.target);
});

document.getElementById('title').addEventListener('click', function (e) {
  let title = e.target.childNodes[0].nodeValue;
  const newTitle = prompt('Escribe un titulo nuevo');
  if (newTitle.trim() == '') {
    alert('Escribe algo como titulo');
  } else {
    e.target.childNodes[0].nodeValue = newTitle.trim();
    localStorage.setItem('title', document.getElementById('title').innerHTML);
  }
});
