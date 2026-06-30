// Array of objects - each object represents one animal in the jungle
const animals = [
    {
        name: "Chicken",
        key: "h",
        image: "images/chicken.gif",
        sound: "sounds/Chicken.mp3"
    },
    {
        name: "Dog",
        key: "d",
        image: "images/dog.gif",
        sound: "sounds/Dog.mp3"
    },
    {
        name: "Duck",
        key: "u",
        image: "images/duck.gif",
        sound: "sounds/Duck.mp3"
    },
    {
        name: "Elephant",
        key: "e",
        image: "images/elephant.gif",
        sound: "sounds/Elephant.mp3"
    },
    {
        name: "Lion",
        key: "l",
        image: "images/lion.gif",
        sound: "sounds/Lion.mp3"
    },
    {
        name: "Monkey",
        key: "m",
        image: "images/monkey.gif",
        sound: "sounds/Monkey.mp3"
    },
    {
        name: "Cow",
        key: "c",
        image: "images/cow.gif",
        sound: "sounds/cow.wav"
    }
];

const animalsContainer = document.getElementById("animalsContainer");
const musicBtn = document.getElementById("musicBtn");
const randomBtn = document.getElementById("randomBtn");
const lastAnimalText = document.getElementById("lastAnimalText");
const startOverlay = document.getElementById("startOverlay");
const startBtn = document.getElementById("startBtn");

const backgroundMusic = new Audio("sounds/jungle.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;

let isMusicPlaying = false;

// This function creates all animal cards automatically
function createAnimalCards() {
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[i];

        const card = document.createElement("div");
        card.classList.add("animal-card");
        card.setAttribute("data-name", animal.name);

        card.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}">
            <h3>${animal.name}</h3>
            <p>Press "${animal.key.toUpperCase()}"</p>
        `;

        card.addEventListener("click", function () {
            playAnimalSound(animal);
        });

        animalsContainer.appendChild(card);
    }
}

// This function plays the sound of the selected animal
function playAnimalSound(animal) {
    const animalSound = new Audio(animal.sound);
    animalSound.volume = 0.8;
    animalSound.play();

    showActiveAnimal(animal.name);
    updateLastAnimal(animal.name);
}

// This function adds a short animation to the selected animal
function showActiveAnimal(animalName) {
    const allCards = document.querySelectorAll(".animal-card");

    allCards.forEach(function (card) {
        card.classList.remove("active");

        if (card.getAttribute("data-name") === animalName) {
            card.classList.add("active");

            setTimeout(function () {
                card.classList.remove("active");
            }, 500);
        }
    });
}

// This function updates the last animal text
function updateLastAnimal(animalName) {
    lastAnimalText.textContent = animalName;

    /*
       JavaScript element not studied in class: localStorage.
       localStorage allows us to save information in the browser.
       Here, we save the last animal the user played, so it can still appear
       even after refreshing the page.
    */
    localStorage.setItem("lastAnimal", animalName);
}

// This function loads the last animal from localStorage
function loadLastAnimal() {
    const savedAnimal = localStorage.getItem("lastAnimal");

    if (savedAnimal !== null) {
        lastAnimalText.textContent = savedAnimal;
    }
}

// This function checks which key was pressed
function handleKeyboardPress(event) {
    const pressedCode = event.code;

    for (let i = 0; i < animals.length; i++) {
        if (pressedCode === "Key" + animals[i].key.toUpperCase()) {
            playAnimalSound(animals[i]);
            break;
        }
    }
}

// This function plays a random animal sound
function playRandomAnimal() {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const randomAnimal = animals[randomIndex];

    playAnimalSound(randomAnimal);
}

// This function starts or pauses the background music
function toggleBackgroundMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicBtn.textContent = "Play Background Music";
        isMusicPlaying = false;
    } else {
        backgroundMusic.play();
        musicBtn.textContent = "Pause Background Music";
        isMusicPlaying = true;
    }
}

// This function tries to start the background music when the page loads
function startBackgroundMusic() {
    backgroundMusic.play()
        .then(function () {
            isMusicPlaying = true;
            musicBtn.textContent = "Pause Background Music";
        })
        .catch(function () {
            startOverlay.style.display = "flex";
        });
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    createAnimalCards();
    loadLastAnimal();
    startBackgroundMusic();
});

document.addEventListener("keydown", handleKeyboardPress);

musicBtn.addEventListener("click", toggleBackgroundMusic);

randomBtn.addEventListener("click", playRandomAnimal);

startBtn.addEventListener("click", function () {
    backgroundMusic.play();
    isMusicPlaying = true;
    musicBtn.textContent = "Pause Background Music";
    startOverlay.style.display = "none";
});
