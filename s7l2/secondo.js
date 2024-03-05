//secondo esercizio

document.getElementById('elementoContatore')

function avviaContatore() {
    let contatore = sessionStorage.getItem('contatore') || 0;
    let intervallo = setInterval(function() {
        contatore++;
        console.log(contatore + "secondi");
        sessionStorage.setItem('contatore', contatore);
        elementoContatore.textContent = " ti stiamo tracciando da " + contatore + " secondi";
    }, 1000);
}

avviaContatore();