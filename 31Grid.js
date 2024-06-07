let maincontainer = document.querySelector(".maincontainer");
let header = document.querySelector(".header");
let bodyregion = document.querySelector(".bodyregion");
let sidebarregion = document.querySelector(".sidebarregion");
let contentregion = document.querySelector(".contentregion");
let footer = document.querySelector(".footer");
let showhere = document.querySelector(".showhere");
let pageno = document.querySelector(".pageno");
let sidebar = document.querySelector(".sidebarregion-flex");
let searchbutton = document.querySelector("#searchbutton");
let searchName = document.querySelector("#searchName");
let nameHeading = document.querySelector("#nameHeading");
let table = document.querySelector("#table");
let author = document.querySelector(".author");

let forBackButton = document.querySelector(".forward-backward");
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");

let currIndex = null;
let maxIndex = null;
var celebrityName = "";
var celebDatas = null;

API = `https://api.api-ninjas.com/v1/celebrity?name=`;
API_KEY = "ctbyjKRUQVdMAJzs4noDTg==VxNqZmoKrf4JX5nG";

requestObject = {
  method: "GET",
  headers: {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json",
  },
};

author.addEventListener("click", () => {
  showAuthorDetails();
  showAuthorDiv();
});

searchbutton.addEventListener("click", (event) => {
  console.log("search button clicked...");
  resetEverything();
  celebrityName = searchName.value;

  if (celebrityName == "") {
    displayTipMessage();
  } else if (celebrityName != "" && celebrityName != undefined) {
    fetchData();
  }
});

previous.addEventListener("click", (event) => {
  nextCanHover();
  if (currIndex > 0) {
    if (--currIndex == 0) {
      previousCantHover();
    }
    updateTexts();
  }
});

next.addEventListener("click", (event) => {
  previousCanHover();
  if (currIndex < maxIndex) {
    if (++currIndex == maxIndex) {
      nextCantHover();
    }
    updateTexts();
  }
});

displayTipMessage();

function resetEverything() {
  currIndex = null;
  maxIndex = null;
  showhere.innerText = "";
  sidebar.innerHTML = "";
  celebrityName = "";
  nameHeading.innerHTML = "";
  celebDatas = null;
  updateNameHeading();
}

async function fetchData() {
  URL = API + celebrityName;
  let response = await fetch(URL, requestObject);
  console.log(response.status);
  if (response.status == 200) {
    response.json().then((result) => {
      celebDatas = result;
      processResponse();
    });
  }
}

function updateTexts() {
  updateNameHeading();
  updateDivContent();
  updatePageNo();
}

function processResponse() {
  console.log("result: ", celebDatas);
  currIndex = 0;
  maxIndex = celebDatas.length - 1;
  if (maxIndex < 0) {
    bigName.innerText = "NO RESULT FOUND !!";
    return;
  } else {
    updateResultList();
    updateTexts();
    previousCantHover();
  }
}

function updateDivContent() {
  showhere.innerHTML = ``;
  str = ``;
  for (let key in celebDatas[currIndex]) {
    let th = `<td>${key}</td>`;
    let td = ` <td>${celebDatas[currIndex][key]}</td> `;
    let row = `<tr> ` + th + td + ` </tr>`;
    str += row;
  }

  str = "<table class='table table-hover table-dark'>" + str + "</table>";

  showhere.innerHTML += str;
}

function showAuthorDiv() {
  showhere.innerHTML = ``;
  str = ``;
  author = {
    Name: "Abhijeet D",
    Age: 25,
    Institue: "VJTI, Mumbai",
    Degree: "EXTC",
    CPI: "8.32",
    Experience: "1.5 Years as Software Engineer at Telstra",
  };
  for (let key in author) {
    let th = `<td>${key}</td>`;
    let td = ` <td>${author[key]}</td> `;
    let row = `<tr> ` + th + td + ` </tr>`;
    str += row;
  }

  str = "<table class='table table-hover table-dark'>" + str + "</table>";

  showhere.innerHTML += str;
}

function hideBackwardForwardButton() {
  forBackButton.style.display = "none";
}

function updatePageNo() {
  pageno.innerText = `${currIndex + 1}` + "/" + `${maxIndex + 1}`;
}

function previousCantHover() {
  previous.classList.add("noHover");
}

function nextCantHover() {
  next.classList.add("noHover");
}

function previousCanHover() {
  previous.classList.remove("noHover");
}

function nextCanHover() {
  next.classList.remove("noHover");
}

function showAuthorDetails() {
  let bigName = document.createElement("h2");
  bigName.classList.add("bigName");

  bigName.innerText = "Abhijeet".toUpperCase();
  nameHeading.innerHTML = "";
  nameHeading.appendChild(bigName);
  setTimeout(() => {
    bigName.style.fontSize = "4rem";
  }, 100);
}
function updateNameHeading() {
  let bigName = document.createElement("h2");
  bigName.classList.add("bigName");

  if (celebDatas != null) {
    bigName.innerText = celebDatas[currIndex]["name"].toUpperCase();
    nameHeading.innerHTML = "";
    nameHeading.appendChild(bigName);
    setTimeout(() => {
      bigName.style.fontSize = "4rem";
    }, 100);
  }
}

function displayTipMessage() {
  let bigName = document.createElement("h2");
  bigName.classList.add("bigName");
  bigName.innerText = "Enter Celebrity Name in Searchbox...";
  nameHeading.innerHTML = "";
  nameHeading.appendChild(bigName);
  setTimeout(() => {
    bigName.style.fontSize = "3rem";
  }, 100);
}

function updateCursorState(ind) {
  currIndex = ind;
  if (currIndex == 0) previousCantHover();
  else previousCanHover();

  if (currIndex == maxIndex) nextCantHover();
  else nextCanHover();
}

function updateResultList() {
  for (let celeb of celebDatas) {
    let str = `<button class="sidebaritem">${celeb["name"]}</button>`;
    sidebar.innerHTML += str;
  }

  document.querySelectorAll(".sidebaritem").forEach((but, ind) => {
    but.addEventListener("click", () => {
      currIndex = ind;
      updateNameHeading();
      updateDivContent();
      updatePageNo();
      updateCursorState(ind);
    });
  });
}
// fetchData()
