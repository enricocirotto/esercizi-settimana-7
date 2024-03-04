class User {
    constructor(firstName, lastName, age, location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.location = location;
    }

    confrontaEta(otherUser) {
        if (this.age > otherUser.age) {
            return `${this.firstName} è più vecchio di ${otherUser.firstName}`;
        } else if (this.age < otherUser.age) {
            return `${this.firstName} è più giovane di ${otherUser.firstName}`;
        } else {
            return `${this.firstName} ha la stessa età di ${otherUser.firstName}`;
        }
    }
}

function confrontaEtàUtenti() {
    
    const utenteX = new User("Mario", "Rossi", 30, "Roma");
    const utenteY = new User("Luigi", "Verdi", 25, "Milano");

    
    const risultatoConfronto = utenteX.confrontaEta(utenteY);

    
    document.getElementById("risultatoConfronto").innerText = risultatoConfronto;
}


// esercizio secondo

class Pet {
    constructor(petName, ownerName, species, breed) {
        this.petName = petName;
        this.ownerName = ownerName;
        this.species = species;
        this.breed = breed;
    }

    sameOwnerAs(otherPet) {
        return this.ownerName === otherPet.ownerName;
    }
}

function createPet() {
    
    const petName = document.getElementById("petName").value;
    const ownerName = document.getElementById("ownerName").value;
    const species = document.getElementById("species").value;
    const breed = document.getElementById("breed").value;

    
    const newPet = new Pet(petName, ownerName, species, breed);

    
    pets.push(newPet);

    
    displayPetList();
}

function displayPetList() {
    
    const petListElement = document.getElementById("petList");

    
    petListElement.innerHTML = "";

    
    pets.forEach(pet => {
        const listItem = document.createElement("li");
        listItem.textContent = `Nome: ${pet.petName}, Proprietario: ${pet.ownerName}, Specie: ${pet.species}, Razza: ${pet.breed}`;
        petListElement.appendChild(listItem);
    });
}


const pets = [];


