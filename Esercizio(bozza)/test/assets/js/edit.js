const nome = document.getElementById('inputName');
const brand = document.getElementById('inputBrand');
const prezzo = document.getElementById('inputPrezzo');
const url = document.getElementById('inputUrl');
const descrizione = document.getElementById('inputDescrizione');
const elimina = document.getElementById('elimina');
const salva = document.getElementById('salva');
const form = document.getElementById('form');
let id;

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWQzNTJkN2IxMTAwMTkwZTcwNmYiLCJpYXQiOjE3MDk4OTUwODcsImV4cCI6MTcxMTEwNDY4N30.GyRUG23AZejkZMwfUptJUEzhpqRWqxZu5VWwCymJqV8"
const dataUrl = "https://striveschool-api.herokuapp.com/api/product/"
let articoli = [];


window.addEventListener('load', init)

const caricaApi = async () => {
    try {
        const carica = await fetch(dataUrl, {
            headers: {
                "Authorization": token
            }
        })
        const risposta = await carica.json();
        articoli = risposta;
    }

    catch (error) {
        console.log(error);
    }
}
const cancellArticolo = async (id) => {
    try {
        let risposta = await fetch(dataUrl + id, {
            method: 'DELETE',
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        });

        if (risposta.ok) {
            console.log(`Articolo con ID ${id} eliminato con successo`);
            window.location.href = 'index.html'
        } else {
            console.error(`Errore durante la cancellazione dell'articolo con ID ${id}`);
        }
    } catch (error) {
        console.log(error);
    }
}



elimina.addEventListener('click', (e) => {
    e.preventDefault()
    let conferma = confirm('Sei sicura di voler eliminare l\'articolo?')
    if (id) {
        let conferma = confirm('Sei sicuro di voler eliminare l\'articolo?');

        if (conferma) {
            cancellArticolo(id);
        }
    } else {
        console.error("ID dell'articolo non valido o mancante");
    }
    if (conferma) {
        cancellArticolo()
    }

})

function recuperoDati(id) {
    articoli.forEach((element) => {
        if (element._id == id) {
            nome.value = element.name
            brand.value = element.brand
            prezzo.value = element.price
            url.value = element.imageUrl
            descrizione.value = element.description

        }
    })
}



async function init() {
    await caricaApi()
    const urlParamas = new URLSearchParams(window.location.search)
    id = urlParamas.get('id')
    if (id) {
        recuperoDati(id)
    }
}

const aggiornaProdotto = async (nuovoProdotto) => {
    try {
        const carica = await fetch(dataUrl+id, {
            method: "PUT",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuovoProdotto)
        });

        if (carica.ok) {
            console.log("Prodotto modificato con successo!");

            window.location.href = "index.html"
        } else {
            console.error("Errore durante la modifica del prodotto:", carica.status);
            const errorMessage = await carica.text();
            console.error("Messaggio di errore:", errorMessage);
        }

    } catch (error) {
        console.error("Errore generico durante la modifica del prodotto:", error);
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

    await aggiornaProdotto(nuovoProdotto);
});