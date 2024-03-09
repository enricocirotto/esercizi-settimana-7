const nome = document.getElementById('name');
const brand = document.getElementById('brand');
const prezzo = document.getElementById('price');
const url = document.getElementById('immagine');
const descrizione = document.getElementById('description');

const dataUrl = "https://striveschool-api.herokuapp.com/api/product/"
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZWQzNTJkN2IxMTAwMTkwZTcwNmYiLCJpYXQiOjE3MDk4OTUwODcsImV4cCI6MTcxMTEwNDY4N30.GyRUG23AZejkZMwfUptJUEzhpqRWqxZu5VWwCymJqV8"

window.addEventListener('load', init)

const cercaApi = async (id) => {
    try {
        const carica = await fetch(dataUrl+id, {
            headers: {
                "Authorization": token
            }
        })
        const risposta = await carica.json();
        return risposta
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

async function recuperoDati(id) {
    const articolo = await cercaApi(id)
    nome.innerText = articolo.name
    brand.innerText = articolo.brand
    prezzo.innerText = articolo.price
    url.src = articolo.imageUrl
    descrizione.innerText = articolo.description
}



async function init() {
    const urlParamas = new URLSearchParams(window.location.search)
    const id = urlParamas.get('id')
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