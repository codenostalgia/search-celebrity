let maincontainer = document.querySelector(".maincontainer");
let header = document.querySelector(".header");
let bodyregion = document.querySelector(".bodyregion");
let sidebarregion = document.querySelector(".sidebarregion");
let contentregion = document.querySelector(".contentregion");
let footer = document.querySelector(".footer");
let showhere = document.querySelector(".showhere");
let pageno = document.querySelector(".pageno");
let sidebar = document.querySelector(".sidebarregion-flex");
let bigName = document.querySelector(".bigName");
let searchbutton = document.querySelector("#searchbutton");
let searchName = document.querySelector("#searchName");

let forBackButton = document.querySelector(".forward-backward");
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");

var celebrityName = "";
var celebData = "";
API = `https://api.api-ninjas.com/v1/celebrity?name=`;
API_KEY = "ctbyjKRUQVdMAJzs4noDTg==VxNqZmoKrf4JX5nG";

requestObject = {
  method: "GET",
  headers: {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json",
  },
};

searchbutton.addEventListener("click", (event) => {
  console.log("search button clicked...");
  hideBackwardForwardButton();
  celebrityName = searchName.value;
  if (celebrityName != "" && celebrityName != undefined) {
    fetchData();
  }
});

console.log("javascript running.......");

async function fetchData() {
  URL = API + celebrityName;
  let response = await fetch(URL, requestObject);
  console.log(response.status);
  if (response.status == 200) {
    response.json().then((result) => {
      processResponse(result);
    });
  }
}

function processResponse(result) {
  console.log("result: ", result);
  if (result.length == 0) {
    bigName.innerText = "NO RESULT FOUND !!";
    return;
  } else {
    updateResultList(result);
    updateContentDiv(result);
  }
}

function updateContentDiv(result) {
  let ind = 0;
  updadeIndexAndContent(result, ind);

  if (result.length > 1) {
    showBackwardForwardButton(result.length);
    previousCantHover();

    next.addEventListener("click", (event) => {
      previousCanHover();
      if (ind < result.length - 1) {
        if (++ind == result.length - 1) {
          nextCantHover();
        }
        updatePageNo(ind + 1, result.length);
        updadeIndexAndContent(result, ind);
      }
    });

    previous.addEventListener("click", (event) => {
      nextCanHover();
      if (ind > 0) {
        if (--ind == 0) {
          previousCantHover();
        }
        updatePageNo(ind + 1, result.length);
        updadeIndexAndContent(result, ind);
      }
    });
  }
}

function updadeIndexAndContent(result, ind) {
  updateNameHeading(result[ind]["name"]);
  showhere.innerText = JSON.stringify(result[ind], null, 2);
}

function hideBackwardForwardButton() {
  forBackButton.style.display = "none";
}

function showBackwardForwardButton(pages) {
  forBackButton.style.display = "flex";
  startPageNo(pages);
}

function startPageNo(pages) {
  pageno.innerText = "1" + "/" + pages;
}

function updatePageNo(ind, pages) {
  pageno.innerText = ind + "/" + pages;
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

function updateNameHeading(bName) {
  bigName.innerText = bName.toUpperCase();
}

function updateResultList(results) {
  sidebar.innerHTML = "";
  for (let result of results) {
    let str = `<button class="sidebaritem">${result["name"]}</button>`;
    sidebar.innerHTML += str;
  }

  let buttons = document.querySelectorAll(".sidebaritem");

  buttons.forEach((but, ind) => {
    but.addEventListener("click", () => {
      updadeIndexAndContent(results, ind);
    });
  });
}
// fetchData()
