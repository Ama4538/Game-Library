import './style/style.css'

const Display = document.querySelector("#display");
const Form = document.querySelector("form");

let myLibrary = [];

Form.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary(new game(
        document.querySelector("#title").value,
        document.querySelector("#company").value,
        document.querySelector("#hoursplayed").value,
        document.querySelector("#favorite").checked
    ));
    event.target.reset();
});

//Constructor
function game (title, company, hours, favorite ) {
    this.title = title
    this.company = company
    this.hours = hours
    this.favorite  = favorite 
}

function addBookToLibrary(game) {
    myLibrary.push(game);
    setUpDisplay(myLibrary);
}

//PlaceHolders
let tft = new game("Teamfight Tactic","riot","256", false)
let league = new game("League of Legends","riot","405", true)
let csgo = new game("CSGO","Valve","205", true)
let destiny2 = new game("Destiny 2","Bungie","604", false)
let fornite = new game("Fornite","epic","256", false)

addBookToLibrary(tft)
addBookToLibrary(league)
addBookToLibrary(csgo)
addBookToLibrary(destiny2)
addBookToLibrary(fornite)

//sets up display
function setUpDisplay() {
    Display.innerHTML = "";
    for (var i in myLibrary) {
        
        //creating elements
        var gameContainer = document.createElement('div');
            gameContainer.classList.add("games")
        var hoursPlay = document.createElement('h3');
        var gametitle = document.createElement('h1');
        var gameCompany = document.createElement('h3');
        var favorite  = document.createElement('button');
            favorite.setAttribute("index", i)
            if (myLibrary[i].favorite === true) {
                favorite.classList.add("btn")
                favorite.classList.add("favoriteBtn")
                favorite.classList.add("true")
                favorite.textContent = "Favorited"
            }
            else {
                favorite.classList.add("btn")
                favorite.classList.add("favoriteBtn")
                favorite.classList.add("false")
                favorite.textContent = "Favorite"
            }
            favorite.addEventListener("click", (e) => {
                myLibrary[e.target.getAttribute("index")].favorite = !myLibrary[e.target.getAttribute("index")].favorite;
                console.log(myLibrary[e.target.getAttribute("index")].favorite)
                setUpDisplay();
            })
        var deleteBtn = document.createElement('button')
            deleteBtn.textContent = "X";
            deleteBtn.setAttribute("index", i)
            deleteBtn.addEventListener("click", (e) => {
                if (e.target.getAttribute('index') != 0) {
                    myLibrary.splice(e.target.getAttribute('index'), e.target.getAttribute('index'))
                }
                else {
                    myLibrary.shift();
                }
                
                setUpDisplay();
            });
            deleteBtn.classList.add("deleteBtn")
            deleteBtn.classList.add("btn")

        //Renaming elements
        hoursPlay.textContent = `Total Play Hours: ${myLibrary[i].hours}`;
        gametitle.textContent = `${myLibrary[i].title}`;
        gameCompany.textContent = `By ${myLibrary[i].company}`;

        //Appending elements
        addElement(gameContainer, gametitle);
        addElement(gameContainer, gameCompany);
        addElement(gameContainer, hoursPlay);
        addElement(gameContainer, favorite);
        addElement(gameContainer, deleteBtn);

        addElement(Display, gameContainer);
    }
}

function addElement(parent, element) {
    parent.appendChild(element);
}
