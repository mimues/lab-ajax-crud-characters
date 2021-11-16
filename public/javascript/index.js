const charactersAPI = new APIHandler('http://localhost:8000');

// let name = document.querySelector('.name')
// let occupation = document.querySelector('.occupation')
// let cartoon = document.querySelector('.cartoon')
// let weapon = document.querySelector('.weapon')

const charactersContainer = document.querySelector('.characters-container')


window.addEventListener('load', () => {
  //Fetch All
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    
    event.preventDefault()
    loadCharactersFromAPI()
  });

  //Fetch One
  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()
    const id = document.querySelector('.operation input').value

    charactersAPI.getOneRegister(id)
      .then(res => {
        let charactersInfo = ''
        console.log(res);
        charactersInfo += `<div class="character-info">
        <div class="name">Character Name: ${res.data.name}</div>
        <div class="occupation">Character Occupation: ${res.data.occupation}</div>
        <div class="cartoon">Is a Cartoon? ${res.data.cartoon}</div>
        <div class="weapon">Character Weapon: ${res.data.weapon}</div>
        </div>`

        charactersContainer.innerHTML = charactersInfo
      })
      .catch(err => console.log(err))
  });


  //Delete
  const deleteForm = document.querySelector('#delete-form')
  let deleteButton = document.querySelector('#delete-one')

  document.getElementById('delete-one').addEventListener('click', function (event) {

    event.preventDefault()
    const id = document.querySelector('.operation.delete input').value

    charactersAPI.deleteOneRegister(id)
      .then(res => {
        deleteForm.reset()
        deleteButton.style.background = 'green'
        loadCharactersFromAPI()
      })
      .catch(err => deleteButton.style.background = 'green')
  });

  //Edit one
  const editCharacterForm = document.querySelector('#edit-character-form')
  let editButton = document.querySelector('#send-data-edit')

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const editFormInputs = document.querySelectorAll('#edit-character-form input')

    const id = editFormInputs[0].value
    const name = editFormInputs[1].value
    const occupation = editFormInputs[2].value
    const weapon = editFormInputs[3].value
    const cartoon = editFormInputs[4].checked
    const info = {
      name,
      occupation,
      weapon,
      cartoon
    }

    charactersAPI.updateOneRegister(id, info)
      .then(res => {
        editCharacterForm.reset()
        editButton.style.background = 'green'
        loadCharactersFromAPI()
      })
      .catch(err => editButton.style.background = 'red')

  });

  //Create one
  const newCharacterForm = document.querySelector('#new-character-form')
  let createButton = document.querySelector('#send-data-create')

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')

    const name = inputs[0].value
    const occupation = inputs[1].value
    const weapon = inputs[2].value
    const cartoon = inputs[3].checked
    const info = {
      name,
      occupation,
      weapon,
      cartoon
    }

    charactersAPI.createOneRegister(info)
      .then(res => {
        newCharacterForm.reset()
        createButton.style.background = 'green'
        loadCharactersFromAPI()
      })
      .catch (err => createButton.style.background = 'red')
  });
});

function loadCharactersFromAPI() {
  charactersAPI.getFullList()
      .then(res => {
        let charactersInfo = ''

        res.data.reverse().forEach(character => {
          charactersInfo += `<div class="character-info">
          <div class="name">Character Name: ${character.name}</div>
          <div class="occupation">Character Occupation: ${character.occupation}</div>
          <div class="cartoon">Is a Cartoon? ${character.cartoon}</div>
          <div class="weapon">Character Weapon: ${character.weapon}</div>
        </div>`
        })

        charactersContainer.innerHTML = charactersInfo
      })
      .catch(err => console.log(err))
}
