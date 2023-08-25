const url = "https://swapi.dev/api/people/";
const container = document.getElementById('container');
const getButton = container.querySelector('button');
const table = container.querySelector('table');

async function getData() {
    container.classList.add('loading')
    try {
        const response = await fetch(url, {
            method: "GET",
        });
        const json = await response.json();
        json.results.map((person) => {
            const row = document.createElement("tr");
            const attributes = new personAttibutes(person);
            for (const property in attributes) {
                const spec = document.createElement("td");
                spec.innerText = attributes[property];
                row.appendChild(spec);
              }
            table.appendChild(row);
        })
        container.classList.remove('loading')
        container.classList.add('loaded')
    } catch (error) {
        console.error("Ошибка:", error);
    } 
}

function clearData () {
    container.classList.remove('loaded');
    while (table.lastChild) {
        if (table.lastChild.nodeName != 'TR') { return }
        table.removeChild(table.lastChild);
    }
}

class personAttibutes {
    name = '';
    gender = '';
    hair_color = '';
    height = '';
    birth_year = ''
    constructor (
        person,
      )
      {
        this.name = person?.name ? person.name : '';
        this.gender = person?.gender ? person.gender : '';
        this.hair_color = person?.hair_color ? person.hair_color : '';
        this.height = person?.height ? person.height : '';
        this.birth_year = person?.birth_year ? person.birth_year : '';
      }
}