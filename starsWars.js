const BASE_URL = "https://swapi.dev/api";
let page = 1;
let currentCategory = "";
let headerAdded = false;
async function getApi() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
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

async function generateBtn(url) {
  const btnPack = await document.getElementById("buttons");
  const data = await getApi();
  const names = Object.keys(data);

  for (i = 0; i < names.length; i++) {
    const category = names[i];
    const button = document.createElement("button");
    button.innerHTML = category;
    button.addEventListener("click", async () => {
      currentCategory = category;
      page = 1;
      await displayData();
      //await showListView();
    });
    btnPack.append(button);
  }
}
generateBtn();

const refreshPage = () => {
  if (currentCategory === "") {
    gravity;
    prevBtn.disabled = true;
    nextBtn.disabled = false;
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

function deleteElement(rowIndex) {
  const dataTable = document.getElementById("dataTable");
  const row = document.getElementById(`row ${currentCategory}${rowIndex}`);
  dataTable.removeChild(row);
}
async function displayData() {
  const dataTable = document.getElementById("dataTable");
  const tableHeader = document.getElementById("tableUp");
  const tableBody = document.getElementById("tableDown");
  const results = await getData(currentCategory, page);
  dataTable.innerHTML = "";

  console.log("currentCategory", currentCategory);
  // if (!headerAdded) {
  //   tableHeader.innerHTML = fillCategoryWithData(currentCategory, true);
  // }
  // tableHeader.innerHTML = "";
  // tableBody.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("data-table");

  for (i = 0; i < results.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = fillCategoryWithData(results[i], i, currentCategory);
    table.append(row);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteElement(i);
    });
    row.appendChild(deleteBtn);

    const detailsBtn = document.createElement("button");
    detailsBtn.classList.add("details");
    detailsBtn.innerHTML = "Details";
    detailsBtn.addEventListener("click", () => {
      // await showDetails(i);
    });
    row.appendChild(detailsBtn);
  }

  dataTable.appendChild(table);
  headerAdded = false;
  refreshPage();
}
// async function showListView() {
//   const listView = document.getElementById("listView");
//   listView.innerHTML = "";
//   const data = await getData(currentCategory, page);
//   for (i = 0; i < data.length; i++) {
//     const modelBtn = document.createElement("button");
//     modelBtn.innerHTML = data[i].name;
//     modelBtn.addEventListener("click", async () => {
//       await showDetails(i);
//     });
//     listView.appendChild(modelBtn);
//   }
// }

function nextPage() {
  page++;
  displayData();
}
function prevPage() {
  page--;
  displayData();
}

async function getModel(index) {
  const results = await getData(currentCategory, page);
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
    case "starship":
      return new Starship(results[index], index);
  }
  console.log(currentCategory);
}
getModel();

function showDetails(index) {
  const model = getModel(index);
  const detailsViev = document.getElementById("details");
  details.innerHTML = model.toHTML();

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "Close";
  closeBtn.addEventListener("click", () => {
    details.innerHTML = "";
    displayData();
  });

  detailsViev.appendChild(closeBtn);
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
          <th>created</th>
          </tr>`;
          break;
        case category === "vehicles":
          html += `<tr>
          <th>id</th>
          <th>name</th>
          <th>manufacturer</th>
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
    case category === "vehicles":
      const vehicle = new Vehicle(val, index);
      addHeader(headerAdded);
      return (html += vehicle.toHTML());
    case category === "starships":
      const starship = new Starships(val, index);
      addHeader(headerAdded);
      return (html += starship.toHTML());
  }
  return html;
};

fillCategoryWithData();

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
    // <button class="details person" data-index="${this.index}">details</button>
    // <button class="delete person" data-index="${this.index}">
    //   delete
    // </button>;

    return `<tr class="row Person${this.index}">
    <td>${this.index}</td>
    <td>${this.name}</td>
    <td>${this.birth_year}</td>
    <td>${this.height}</td>
    <td>${this.mass}</td>
    <td>${this.gender}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
      <td>
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
    return `<tr class="row Planet${this.index}">
        <td>${this.index}</td>
        <td>${this.name}</td>
        <td>${this.climate}</td>
        <td>${this.diameter}</td>
        <td>${this.gravity}</td>
        <td>${this.population}</td>
        <td>${new Date(this.created).toLocaleDateString()}</td> 
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
    return `<tr class="row Film${this.index}">
    <td>${this.index}</td>
      <td>${this.title}</td>
      <td>${this.director}</td>
      <td>${this.producer}</td>
      <td>${this.release_date}</td>
      <td>${new Date(this.created).toLocaleDateString()}</td>
    </tr>`;
  }
}

class Species {
  constructor({ name, language, average_height, created }, index) {
    this.index = index;
    this.name = name;
    this.language = language;
    this.average_height = average_height;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row Species${this.index}">
      <td>${this.index}</td>
      <td>${this.name}</td>
      <td>${this.language}</td>
      <td>${this.average_height}</td>
     
      <td>${new Date(this.created).toLocaleDateString()}</td>
    </tr>`;
  }
}
class Vehicle {
  constructor({ name, manufacturer, cost_in_credits, created }, index) {
    this.index = index;
    this.name = name;
    this.manufacturer = manufacturer;
    this.cost_in_credits = cost_in_credits;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row Vehicle${this.index}">
      <td>${this.index}</td>
      <td>${this.name}</td>
      <td>${this.manufacturer}</td>
      <td>${this.cost_in_credits}</td>
      <td>${new Date(this.created).toLocaleDateString()}</td>
    </tr>`;
  }
}
class Starships {
  constructor(
    { name, model, manufacturer, cost_in_credits, passengers, created },
    index
  ) {
    this.index = index;
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
    this.cost_in_credits = cost_in_credits;
    this.passengers = passengers;
    this.created = created;
  }
  toHTML() {
    return `<tr class="row Starships${this.index}">
      <td>${this.index}</td>
      <td>${this.name}</td>
      <td>${this.model}</td>
      <td>${this.manufacturer}</td>
      <td>${this.cost_in_credits}</td>
      <td>${this.passengers}</td>
      <td>${new Date(this.created).toLocaleDateString()}</td>
     </tr>`;
  }
}
fillCategoryWithData();
