const container = document.getElementById('container');
const tbody = container.querySelector('tbody');

async function getData() {
    container.classList.add('loading')
    try {
        const response = await fetch('https://swapi.dev/api/people/', {
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
            tbody.appendChild(row);
        })
        container.classList.remove('loading')
        container.classList.add('loaded')
    } catch (error) {
        console.error("Ошибка:", error);
    } 
}

function clearData () {
    container.classList.remove('loaded');
    tbody.innerHTML = '';
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