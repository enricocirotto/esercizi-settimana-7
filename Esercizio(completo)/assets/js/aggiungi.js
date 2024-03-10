const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWQzNTJkN2IxMTAwMTkwZTcwNmYiLCJpYXQiOjE3MDk4OTUwODcsImV4cCI6MTcxMTEwNDY4N30.GyRUG23AZejkZMwfUptJUEzhpqRWqxZu5VWwCymJqV8"
const dataUrl = "https://striveschool-api.herokuapp.com/api/product/"
let articoli = [];

const nome = document.getElementById('inputName');
const brand = document.getElementById('inputBrand');
const prezzo = document.getElementById('inputPrezzo');
const url = document.getElementById('inputUrl');
const descrizione = document.getElementById('inputDescrizione');
const salva = document.getElementById('salva');
const form = document.getElementById('form');

const aggiungiProdotto = async (nuovoProdotto) => {
    try {
        const carica = await fetch(dataUrl, {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuovoProdotto)
        });

        if (carica.ok) {
            console.log("Prodotto aggiunto con successo!");

            window.location.href = "index.html"
        } else {
            console.error("Errore durante l'aggiunta del prodotto:", carica.status);
            const errorMessage = await carica.text();
            console.error("Messaggio di errore:", errorMessage);
        }

    } catch (error) {
        console.error("Errore generico durante l'aggiunta del prodotto:", error);
    }
}

salva.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        return
    }

    const nomeVal = nome.value;
    const brandVal = brand.value;
    const prezzoVal = prezzo.value;
    const urlVal = url.value;
    const descrizioneVal = descrizione.value;

    const nuovoProdotto = { name: nomeVal, brand: brandVal, price: prezzoVal, imageUrl: urlVal, description: descrizioneVal };

    await aggiungiProdotto(nuovoProdotto);
});