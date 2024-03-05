//primo esercizio

function salvaNome() {
    let nomeInput = document.getElementById('name').value;
        localStorage.setItem('nomeUtente', nomeInput);
        mostraValoreSalvato();
}

function rimuoviNome() {
    localStorage.removeItem('nomeUtente');
    mostraValoreSalvato();
}

function mostraValoreSalvato() {
    let valoreSalvato = localStorage.getItem('nomeUtente');
    let savedValueSpan = document.getElementById('savedValue');
    if (valoreSalvato) {
        savedValueSpan.textContent = valoreSalvato;
    } else {
        savedValueSpan.textContent = 'Nessun valore salvato';
    }
}

mostraValoreSalvato();

