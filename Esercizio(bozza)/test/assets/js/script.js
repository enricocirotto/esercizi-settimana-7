const cartContainer = document.getElementById("cartContainer");
const dataUrl = "https://striveschool-api.herokuapp.com/api/product/";
let articoli = [];
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWQzNTJkN2IxMTAwMTkwZTcwNmYiLCJpYXQiOjE3MDk4OTUwODcsImV4cCI6MTcxMTEwNDY4N30.GyRUG23AZejkZMwfUptJUEzhpqRWqxZu5VWwCymJqV8";
const primoProdotto = {
  name: "Nokia 3110",
  description: "Indestructible cellphone",
  brand: "Nokia",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nokia_3310_Blue_R7309170_%28retouch%29.png/125px-Nokia_3310_Blue_R7309170_%28retouch%29.png",
  price: 19,
};

const prodotto = async () => {
  let stop = false;
  articoli.forEach((element) => {
    if (element.name == primoProdotto.name) {
      stop = true;
    }
  });
  if (stop) {
    return;
  }
  try {
    const carica = await fetch(dataUrl, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(primoProdotto),
    });

    if (carica.ok) {
      console.log("Prodotto aggiunto con successo!");
    } else {
      console.error("Errore durante l'aggiunta del prodotto:", carica.status);
    }
  } catch (error) {
    console.log(error);
  }
};

contenutoCard = (element, col) => {
  col.innerHTML = `<div class="card d-flex align-items-center text-center" >
<img src="${element.imageUrl}" class="card-img-top w-50 " ; alt="...">
<div class="card-body">
  <h5 class="card-title">${element.name}</h5>
  <p class="card-text">${element.description}</p>
</div>

<div class="card-body">
  <a href="edit.html?id=${element._id}"><button id='btn-modifica' class="btn btn-warning me-2" type="">Modifica</button></a>
  <a href="detail.html?id=${element._id}"><button id='btn-scopri' class="btn bg-info" type="">Scopri di più</button></a>
</div>
</div> `;
  cartContainer.appendChild(col);
};

const card = () => {
  articoli.forEach((element) => {
    const col = document.createElement("div");
    col.classList.add("col-3", "my-3");
    contenutoCard(element, col);
  });
};

const caricaApi = async () => {
  try {
    const carica = await fetch(dataUrl, {
      headers: {
        Authorization: token,
      },
    });
    const risposta = await carica.json();
    articoli = risposta;
    card();
    console.log(articoli);
  } catch (error) {
    console.log(error);
  }
};

const existingDiv = document.getElementById("rotellina");

const spinner = document.createElement("div");
spinner.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
existingDiv.appendChild(spinner);

window.addEventListener("load", init);

async function init() {
  await caricaApi();
  //   prodotto(); // usato per debug
  existingDiv.removeChild(spinner);
}
