const BASE_URL = "https://swapi.dev/api";
//stan apki
let page = 1;
let currentCategory = "";
headerAdded = false;
//pobieranie api
async function getApi() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  // console.log(data);
  return data;
}
getApi();

const pages = document.getElementById("controlButtons");
let prevBtn = document.createElement("button");
let prevTxt = document.createTextNode("Prev");
prevBtn.append(prevTxt);
prevBtn.addEventListener("click", prevPage);
pages.append(prevBtn);
const nextBtn = document.createElement("button");
let nextTxt = document.createTextNode("Next");
nextBtn.append(nextTxt);
nextBtn.addEventListener("click", nextPage);
pages.append(nextBtn);
async function getData(category, page) {
  const response = await fetch(`${BASE_URL}/${category}/?page=${page}`);
  const data = await response.json();
  const results = data.results;
  return results;
}
//const tablePack = document.getElementById("tablePack");

//butoniki gorne :)
async function generateBtn(url) {
  const btnPack = document.getElementById("buttons");
  const data = await getApi();
  const names = Object.keys(data);

  for (i = 0; i < names.length; i++) {
    const category = names[i];
    const button = document.createElement("button");
    button.innerHTML = category;
    button.addEventListener("click", () => {
      currentCategory = category;
      page = 1;
      displayData();
    });
    btnPack.append(button);
  }
}
generateBtn();

//tabela i dane
async function displayData() {
  const dataTable = document.getElementById("dataTable");
  const results = await getData(currentCategory, page);
  dataTable.innerHTML = "";
  console.log("currentCategory", currentCategory);
  for (i = 0; i < results.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = fillCategoryWithData(results[i], i, currentCategory);
    dataTable.append(row);
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => {
      showModalConfirmation(i);
    });
    const detailsBtn = document.createElement("button");
    detailsBtn.classList.add("details");
    detailsBtn.innerHTML = "Details";
    detailsBtn.addEventListener("click", () => {
      showDetails(i);
    });
    const cell = document.createElement("td");
    cell.appendChild(deleteBtn);
    cell.appendChild(detailsBtn);
    row.appendChild(cell);
  }
  refreshPage();
}
function showDetails(index) {
  const model = getModel(index);
  const detailsViev = document.getElementById("detailsViev");
  detailsViev.innerHTML = model.toHTML();

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "Close";
  closeBtn.addEventListener("Click", () => {
    detailsViev.innerHTML = "";
    displayData();
  });

  detailsViev.appendChild(closeBtn);
}
function showModalConfirmation(index) {
  const modal = document.getElementById("modal");

  const yesBtn = document.createElement("button");
  yesBtn.innerHTML = "Yes";
  yesBtn.addEventListener("click", () => {
    deleteElement(index);
    modal.style.display = "none";
  });
  const noBtn = document.createElement("button");
  noBtn.innerHTML = "No";
  noBtn.addEventListener("Click", () => {
    modal.style.display = "none";
  });
  modal.innerHTML = "Are you sure??";
  modal.appendChild(yesBtn);
  modal.appendChild(noBtn);
}
function deleteElement(index) {
  const dataTable = document.getElementById("dataTable");
  const row = document.getElementById(`row ${currentCategory}${index}`);
  dataTable.removeChild(row);
}

function getModel(index) {
  const results = getData(currentCategory, page);
  switch (currentCategory) {
    case "people":
      return new Person(results[index], index);
    case "planets":
      return new Planet(results[index], index);
    case "films":
      return new Film(results[index], index);
    case "species":
      return new Species(results[index], index);
    case "vehicle":
      return new Vehicle(results[index], index);
    case "starships":
      return new Starship(results[index], index);
  }
}

//prev i next btn
function nextPage() {
  page++;
  displayData();
}
function prevPage() {
  page--;
  displayData();
}

const refreshPage = () => {
  if (currentCategory === "") {
    prevBtn.disabled = true;
    nextBtn.disabled = false; //lub false
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
  if (page <= 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
};
refreshPage();

class Person {
  constructor({ name, height, mass, gender, birth_year, created }, index) {
    this.index = index;
    this.name = name;
    this.birth_year = birth_year;
    this.height = height;
    this.mass = mass;
    this.gender = gender;
    this.created = created;
  }

  toHTML() {
    return `<tr id="row Person${this.index}">
    <td>${this.index}</td>
    <td>${this.name}</td>
    <td>${this.birth_year}</td>
    <td>${this.height}</td>
    <td>${this.mass}</td>
    <td>${this.gender}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td>
    <button class="details person index${this.index}">details</button>
    <button class="delete person index${this.index}">delete</button>
    </td>
    </tr>`;
  }
}
class Planet {
  constructor(
    { name, climate, diameter, gravity, population, created },
    index
  ) {
    this.index = index;
    this.name = name;
    this.climate = climate;
    this.diameter = diameter;
    this.gravity = gravity;
    this.population = population;
    this.created = created;
  }
  toHTML() {
    return `<tr id="row Planet${this.index}">
        <td>${this.name}</td>
        <td>${this.climate}</td>
        <td>${this.diameter}</td>
        <td>${this.gravity}</td>
        <td>${this.population}</td>
        <td>${new Date(this.created).toLocaleDateString()}</td>
        <td>
          <button class="details planet index${this.index}">details</button> 
          <button class="delete planet index${this.index}">delete</button>
        </td>
      </tr>`;
  }
}
class Film {
  constructor({ title, director, producer, release_date, created }, index) {
    this.index = index;
    this.title = title;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.created = created;
  }
  toHTML() {
    return `<tr id="row Film${this.index}">
      <td>${this.title}</td>
      <td>${this.director}</td>
      <td>${this.producer}</td>
      <td>${this.release_date}</td>
      <td>${new Date(this.created).toLocaleDateString()}</td>
      <td>
        <button class="details film index${this.index}">details</button>
        <button class="delete film index${this.index}">delete</button>
      </td>
    </tr>`;
  }
}
class Species {
  constructor(
    { name, language, average_height, average_lifespan, created },
    index
  ) {
    this.index = index;
    this.name = name;
    this.language = language;
    this.average_height = average_height;
    this.average_lifespan = average_lifespan;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row Species${this.index}>
      <td>${this.index}</td>
      <td>${this.name}</td>
      <td>${this.language}</td>
      <td>${this.average_height}</td>
      <td>${this.average_lifespan}</td>
      <td>${new Date(this.created).toLocaleDateString()}</td>
      <td>
        <button class="detais species index${this.index}">detais</button>
        <button class="delete species index ${this.index}">delete</button> 
      </td>
    </tr>`;
  }
}
class Vehicle {
  constructor({ name, manufacturer, lenght, cost_in_credits, created }, index) {
    this.index = index;
    this.name = name;
    this.manufacturer = manufacturer;
    this.lenght = lenght;
    this.cost_in_credits = cost_in_credits;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row Vehicle">
      <td>${this.index}</td>
      <td>${this.name}</td>
      <td>${this.manufacturer}</td>
      <td>${this.lenght}</td>
      <td>${this.cost_in_credits}</td>
      <td>${new Date(this.created).toLocaleDateString()}</td>
      <td>
        <button class="details vehicle index ${this.index}">details</button>
        <button class="delete vehicle index ${this.index}">delete</button>
      </td>
    </tr>`;
  }
}
class Starships {
  constructor(
    { name, model, manufacturer, cost_in_credits, passengers },
    index
  ) {
    this.index = index;
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
    this.cost_in_credits = cost_in_credits;
    this.passengers = passengers;
  }
  toHTML() {
    return `<tr clss="row Starships">
      <td>${this.index}</td>
      <td>${this.name}</td>
      <td>${this.model}</td>
      <td>${this.manufacturer}</td>
      <td>${this.cost_in_credits}</td>
      <td>${this.passengers}</td>
      <td>${new Date(this.created).toLocaleDateString()}</td>
      <td>
        <button class="details vehicles index${this.index}">details</button>
        <button class ="delete vehicles index${this.index}">delete</button>
      </td>
    </tr>`;
  }
}
const fillCategoryWithData = (val, index, category) => {
  let html = "";

  const addHeader = (flag) => {
    if (!flag) {
      switch (true) {
        case category === "people":
          html += `<tr>
          <th>id</th>
          <th>name</th>
          <th>birth</th>
          <th>height</th>
          <th>mass</th>
          <th>gender</th>
          <th>created</th>
          </tr>`;
          break;
        case category === "planets":
          html += `<tr>
          <th>id</th>
          <th>name</th>
          <th>climate</th>
          <th>diameter</th>
          <th>gravity</th>
          <th>population</th>
          <th>created</th>
          </tr>`;
          break;
        case category === "films":
          html += `<tr>
          <th>id</th>
          <th>title</th>
          <th>director</th>
          <th>producer</th>
          <th>release</th>
          <th>created</th>
          </tr>`;
          break;
        case category === "species":
          html += `<tr>
          <th>id</th>
          <th>name</th>
          <th>language</th>
          <th>average</th>
          <th>average</th>
          <th>created</th>
          </tr>`;
          break;
        case category === "vehicles":
          html += `<tr>
          <th>id</th>
          <th>name</th>
          <th>manufacturer</th>
          <th>lenght</th>
          <th>cost</th>
          <th>created</th>
          </tr>`;
          break;
        case category === "starships":
          html += `<tr>
          <th>id</th>
          <th>name</th>
          <th>model</th>
          <th>manufacturer</th>
          <th>cost</th>
          <th>passengers</th>
          </tr>`;
          break;
      }
    }
    headerAdded = true;
  };
  switch (true) {
    case category === "people":
      const person = new Person(val, index);
      addHeader(headerAdded);
      return (html += person.toHTML());
    case category === "planets":
      const planet = new Planet(val, index);
      addHeader(headerAdded);
      return (html += planet.toHTML());
    case category === "films":
      const film = new Film(val, index);
      addHeader(headerAdded);
      return (html += film.toHTML());
    case category === "species":
      const species = new Species(val, index);
      addHeader(headerAdded);
      return (html += species.toHTML());
    case category === "vehicle":
      const vehicle = new Vehicle(val, index);
      addHeader(headerAdded);
      return (html += vehicle.toHTML());
    case category === "starships":
      const starship = new Starships(val, index);
      addHeader(headerAdded);
      return (html += starship.toHTML());
  }
};

fillCategoryWithData();
