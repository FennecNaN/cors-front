//obtencion por ID

function getCharsInfo() {
    const charIdInput = document.getElementById("charID")
    const charInfo = document.getElementById("charInfo")

    const charID = charIdInput.value

    fetch(`http://localhost:3000/characters/ID/${charID}`)
        .then(response => response.json())
        .then(data => { 
            const {name, status, species, gender, origin: { name: origin } , image } = data;
            charInfo.innerHTML = `
            <h2>${name}</h2>
            <img src="${image}" alt="${name}" />
            <p>Status: ${status}</p>
            <p>Species: ${species}</p>
            <p>Gender: ${gender}</p>
            <p>Origin: ${origin}</p>
            `
        })
        .catch( error => charInfo.innerHTML = `<p>Imposible acceder al personaje por ID, Rick lo mató</p>` )
}


//obtencion por nombres (es un filtrado)

function getCharsFilter() {
    const charFilterInput = document.getElementById("charFilter")
    const charInfo = document.getElementById("charInfo")    

    const charName = charFilterInput.value.toLowerCase()

    fetch(`http://localhost:3000/characters/${charName}`)
        .then(response => response.json())
        .then(data => { 
            const { characters } = data;
            charInfo.innerHTML = characters.map(character => `
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}" />
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
                <p>Gender: ${character.gender}</p>
                <p>Origin: ${character.origin}</p>
        `)
        })
        .catch( error => charInfo.innerHTML = `<p>Imposible acceder al personaje por filtrado, Rick lo mató</p>` )
}

//obtencion de todos los personajes, en el front(app.js) he puesto de limite 50 para no saturar la carga de la pagina pero podrian ser mas

function getAllCharsInfo() {
    fetch(`http://localhost:3000/characters`)
        .then(response => response.json())
        .then(data => { 
            const charInfo = document.getElementById("charInfo");
            charInfo.innerHTML = "";
            data.forEach(character => {
                const {name, status, species, gender, origin: { name: origin }, image } = character;
                const characterElement = document.createElement("div");
                characterElement.innerHTML = `
                    <h2>${name}</h2>
                    <img src="${image}" alt="${name}" />
                    <p>Status: ${status}</p>
                    <p>Species: ${species}</p>
                    <p>Gender: ${gender}</p>
                    <p>Origin: ${origin}</p>
                `;
                charInfo.appendChild(characterElement);
            });
        })
        .catch( error => {
            const charInfo = document.getElementById("charInfo");
            charInfo.innerHTML = `<p>Imposible acceder a todos los personajes</p>`;
        });
}

//borrado del dom

function deleteChars(){
    const charInfo = document.getElementById("charInfo");
    charInfo.innerHTML = "";
}